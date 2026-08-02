import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Eye,
  Download,
  Lock,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react'
import { papers as rawPapers, COMPONENTS, SESSIONS } from '../data/papers'
import PaperViewer from './PaperViewer'
import Reveal from './Reveal'
import { LiquidButton, GlassFilter } from './ui/liquid-glass-button'
import { DisplayCard } from './ui/display-cards'

const subjColor = {
  P1: 'var(--subj-p1)',
  P2: 'var(--subj-p2)',
  P3: 'var(--subj-p3)',
  P4: 'var(--subj-p4)',
}

// Human label e.g. "M/J 2022 · Variant 1"
function labelFor(p) {
  return `${SESSIONS[p.session].short} ${p.year} · Variant ${p.variant}`
}

const filters = [
  { key: 'all', label: 'All papers' },
  { key: 'P1', label: 'Pure 1' },
  { key: 'P2', label: 'Pure 2' },
  { key: 'P3', label: 'Mechanics' },
  { key: 'P4', label: 'Prob & Stats' },
]

export default function PaperCatalog() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)

  const papers = useMemo(
    () => rawPapers.map((p) => ({ ...p, label: labelFor(p) })),
    []
  )

  const counts = useMemo(() => {
    const c = { all: papers.filter((p) => p.available).length }
    for (const k of ['P1', 'P2', 'P3', 'P4']) {
      c[k] = papers.filter((p) => p.component === k && p.available).length
    }
    return c
  }, [papers])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return papers
      .filter((p) => (filter === 'all' ? true : p.component === filter))
      .filter((p) => {
        if (!q) return true
        const hay = [
          COMPONENTS[p.component].name,
          COMPONENTS[p.component].code,
          p.label,
          String(p.year),
          ...(p.topics || []),
        ]
          .join(' ')
          .toLowerCase()
        return hay.includes(q)
      })
      .sort((a, b) => Number(b.available) - Number(a.available) || b.year - a.year)
  }, [papers, filter, query])

  // ---- Scroll-driven "deck" → grid ------------------------------------
  // The cards begin collapsed into a fanned, overlapping deck and separate
  // into their natural grid positions as the section scrolls into view.
  // We drive it manually from getBoundingClientRect (framer's scroll observer
  // is unreliable to verify here). The collapse transform is applied to an
  // inner wrapper so each DisplayCard keeps its own CSS hover/lift, and the
  // outer cell keeps framer's layout/filter animation — no transform clash.
  const gridRef = useRef(null)
  const itemRefs = useRef(new Map())
  // [DISABLED — display-card animations removed at user request]
  // Latch ref for the deck→grid scroll animation. Re-enable together with the
  // commented effect below to restore the stack-and-spread behaviour.
  // const spreadRef = useRef(false)
  const setItemRef = (id, el) => {
    if (el) itemRefs.current.set(id, el)
    else itemRefs.current.delete(id)
  }

  /* [DISABLED — display-card animations removed at user request]
     Scroll-driven deck→grid animation. Cards rendered as a fanned, overlapping
     deck that separated into the grid as the section scrolled in (latched so it
     played once per entrance). To re-enable: uncomment this effect AND the
     spreadRef above AND the `.display-card` animation block in index.css.

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    let raf = 0
    const DECK_DX = 16
    const DECK_DY = 13

    const update = () => {
      const isMobile = window.innerWidth <= 768
      const rect = grid.getBoundingClientRect()
      const vh = window.innerHeight
      const belowView = rect.top >= vh // not reached yet (below the fold)
      const aboveView = rect.bottom <= 0 // scrolled past (above the viewport)

      // Re-arm the intro once the whole section leaves the viewport, so it
      // replays the next time the user scrolls down into it.
      if (belowView || aboveView) spreadRef.current = false
      // Nothing visible to paint when scrolled past the top.
      if (aboveView) return

      let collapse = 0
      if (!isMobile) {
        if (spreadRef.current) {
          collapse = 0
        } else {
          const startTop = vh * 0.9 // grid top here → fully stacked (p = 0)
          const endTop = vh * 0.3 // grid top here → fully spread (p = 1)
          let p = (startTop - rect.top) / (startTop - endTop)
          p = Math.min(Math.max(p, 0), 1)
          // Latch as soon as it reaches full spread; from then on it stays
          // spread (scrolling back up never re-collapses it).
          if (p >= 1) spreadRef.current = true
          collapse = spreadRef.current ? 0 : 1 - p
        }
      }

      const gridW = grid.clientWidth
      const n = visible.length
      visible.forEach((paper, i) => {
        const item = itemRefs.current.get(paper.id)
        if (!item) return
        const cell = item.parentElement // the .paper-deck-cell (framer motion.div)
        if (!cell) return
        if (collapse === 0) {
          item.style.transform = 'none'
          return
        }
        const cardW = cell.offsetWidth
        // centre the cascading deck in the grid
        const anchorX = (gridW - cardW) / 2 - ((n - 1) * DECK_DX) / 2
        const anchorY = 8
        const targetX = anchorX + i * DECK_DX
        const targetY = anchorY + i * DECK_DY
        const tx = (targetX - cell.offsetLeft) * collapse
        const ty = (targetY - cell.offsetTop) * collapse
        const rot = -4 * collapse
        const scl = 1 - 0.06 * collapse
        item.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scl})`
      })
    }

    const onScroll = () => update()
    raf = requestAnimationFrame(update)
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [visible])
  */

  return (
    <section id="papers">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">The library</span>
            <h2>Browse solved 9231 papers</h2>
            <p>
              Filter by component or search a topic. Tap a paper to read the full
              worked solutions inline, or download the PDF.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="catalog-toolbar">
            <div className="filter-group glass">
              {filters.map((f) => (
                <LiquidButton
                  key={f.key}
                  active={filter === f.key}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                  {counts[f.key] > 0 && <span className="count">{counts[f.key]}</span>}
                </LiquidButton>
              ))}
            </div>
            <label className="search-box glass">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search topic, year…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search papers"
              />
            </label>
          </div>
        </Reveal>

        <motion.div layout className="paper-grid" ref={gridRef}>
          <AnimatePresence>
            {visible.map((p, i) => (
              <motion.div
                layout
                key={p.id}
                className="paper-deck-cell"
                style={{ '--z': i }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="paper-deck-item"
                  ref={(el) => setItemRef(p.id, el)}
                >
                <DisplayCard
                  accent={subjColor[p.component]}
                  locked={!p.available}
                  badge={
                    <span className="subj-badge">{COMPONENTS[p.component].code}</span>
                  }
                  ribbon={
                    p.available && (
                      <span className="solved-ribbon">
                        <CheckCircle2 size={13} /> Solved
                      </span>
                    )
                  }
                  title={COMPONENTS[p.component].name}
                  description={`${SESSIONS[p.session].label} ${p.year} · Variant ${p.variant}`}
                  footer={
                    p.available ? (
                      <div className="paper-actions">
                        <a
                          className="icon-btn"
                          href={p.file}
                          download
                          aria-label={`Download ${p.label}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={18} />
                        </a>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setActive(p)}
                        >
                          <Eye size={16} /> Solutions
                        </button>
                      </div>
                    ) : (
                      <span className="coming-soon">
                        <Lock size={16} /> Worked solutions coming soon
                      </span>
                    )
                  }
                />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div
            className="glass"
            style={{
              textAlign: 'center',
              padding: '48px',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--ink-muted)',
            }}
          >
            <HelpCircle size={28} style={{ margin: '0 auto 12px' }} />
            No papers match “{query}”. Try a different topic or clear the search.
          </div>
        )}
      </div>

      <PaperViewer paper={active} onClose={() => setActive(null)} />
      <GlassFilter />
    </section>
  )
}
