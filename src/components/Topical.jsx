import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  FileText,
  CheckCircle2,
  Check,
  Lock,
} from 'lucide-react'
import { PAPER4_TOPICS, topicalQuestions } from '../data/topical'

// Subject → Component → Topic cascade. Only Paper 4 has a question bank so far;
// the other components are listed (disabled) so the structure is visible.
const SUBJECTS = [{ key: '9231', label: 'Further Mathematics (9231)' }]
const COMPONENTS = [
  { key: 'P4', subject: '9231', label: 'Paper 4 · Further Probability & Statistics', available: true },
  { key: 'P3', subject: '9231', label: 'Paper 3 · Further Mechanics', available: false },
  { key: 'P2', subject: '9231', label: 'Paper 2 · Further Pure 2', available: false },
  { key: 'P1', subject: '9231', label: 'Paper 1 · Further Pure 1', available: false },
]

// "9231/41 · O/N 2025 · Q2"
const sourceOf = (q) => `${q.code} · ${q.session} ${q.year} · Q${q.qNo}`

export default function Topical() {
  const [subject, setSubject] = useState('9231')
  const [component, setComponent] = useState('P4')
  const [topicSel, setTopicSel] = useState([]) // [] = all topics
  const [yearSel, setYearSel] = useState([]) // [] = all years
  const [selectedId, setSelectedId] = useState(null)
  const [view, setView] = useState('question') // 'question' | 'answer'

  const components = useMemo(
    () => COMPONENTS.filter((c) => c.subject === subject),
    [subject]
  )
  const topics = component === 'P4' ? PAPER4_TOPICS : []
  const years = useMemo(
    () => [...new Set(topicalQuestions.map((q) => q.year))].sort((a, b) => b - a),
    []
  )

  const list = useMemo(() => {
    if (component !== 'P4') return []
    return topicalQuestions
      .filter((q) => (topicSel.length === 0 ? true : topicSel.includes(q.topic)))
      .filter((q) => (yearSel.length === 0 ? true : yearSel.includes(q.year)))
      .sort((a, b) => b.year - a.year || a.code.localeCompare(b.code) || a.qNo - b.qNo)
  }, [component, topicSel, yearSel])

  const selected = list.find((q) => q.id === selectedId) || list[0] || null
  const selIndex = selected ? list.findIndex((q) => q.id === selected.id) : -1

  const topicSummary =
    topicSel.length === 0
      ? 'All topics'
      : topicSel.length === 1
      ? PAPER4_TOPICS.find((t) => t.key === topicSel[0])?.label
      : `${topicSel.length} topics`

  const go = (delta) => {
    if (selIndex < 0) return
    const next = list[(selIndex + delta + list.length) % list.length]
    if (next) {
      setSelectedId(next.id)
      setView('question')
    }
  }
  const pick = (id) => {
    setSelectedId(id)
    setView('question')
  }

  const fileUrl = selected
    ? view === 'question'
      ? selected.question
      : selected.answer
    : null

  return (
    <section id="topical">
      <div className="container">
        {/* Subject → Component → Topic */}
        <div className="topical-bar glass">
          <Field label="Subject">
            <Select
              value={subject}
              onChange={(v) => {
                setSubject(v)
                setComponent(COMPONENTS.find((c) => c.subject === v)?.key || 'P4')
                setTopicSel([])
                setYearSel([])
                setSelectedId(null)
              }}
              options={SUBJECTS.map((s) => ({ value: s.key, label: s.label }))}
            />
          </Field>
          <Field label="Component">
            <Select
              value={component}
              onChange={(v) => {
                setComponent(v)
                setTopicSel([])
                setYearSel([])
                setSelectedId(null)
                setView('question')
              }}
              options={components.map((c) => ({
                value: c.key,
                label: c.available ? c.label : `${c.label} (coming soon)`,
                disabled: !c.available,
              }))}
            />
          </Field>
          <Field label="Topic">
            <MultiSelect
              disabled={component !== 'P4'}
              selected={topicSel}
              noun="topics"
              allLabel="All topics"
              onChange={(next) => {
                setTopicSel(next)
                setSelectedId(null)
                setView('question')
              }}
              options={topics.map((t) => ({
                value: t.key,
                label: `${t.code}  ${t.label}`,
              }))}
            />
          </Field>
          <Field label="Year">
            <MultiSelect
              disabled={component !== 'P4'}
              selected={yearSel.map(String)}
              noun="years"
              allLabel="All years"
              onChange={(next) => {
                setYearSel(next.map(Number))
                setSelectedId(null)
                setView('question')
              }}
              options={years.map((y) => ({ value: String(y), label: String(y) }))}
            />
          </Field>
        </div>

        <div className="topical-workspace glass">
          {/* Left: question list */}
          <aside className="topical-list">
            <div className="topical-list-head">
              <span>
                <Layers size={15} /> {list.length} question
                {list.length === 1 ? '' : 's'}
              </span>
            </div>
            <div className="topical-rows">
              {list.map((q) => (
                <button
                  key={q.id}
                  className={`topical-row ${
                    selected && q.id === selected.id ? 'active' : ''
                  }`}
                  onClick={() => pick(q.id)}
                >
                  <span className="topical-row-code">
                    {q.code} · Q{q.qNo}
                  </span>
                  <span className="topical-row-meta">
                    {q.session} {q.year} · {q.marks} marks
                  </span>
                </button>
              ))}
              {list.length === 0 && (
                <p className="topical-empty">
                  {component === 'P4'
                    ? 'No questions for these topics yet.'
                    : 'This component is coming soon.'}
                </p>
              )}
            </div>
          </aside>

          {/* Divider */}
          <div className="topical-divider" aria-hidden="true" />

          {/* Right: question / answer reader */}
          <div className="topical-detail">
            {selected ? (
              <>
                <div className="topical-detail-head">
                  <div className="topical-detail-title">
                    <h3>{sourceOf(selected)}</h3>
                    <span className="topical-detail-sub">{topicSummary}</span>
                  </div>
                  <div className="topical-nav">
                    <div className="topical-qa" role="tablist">
                      <button
                        role="tab"
                        aria-selected={view === 'question'}
                        className={view === 'question' ? 'on' : ''}
                        onClick={() => setView('question')}
                      >
                        <FileText size={15} /> Question
                      </button>
                      <button
                        role="tab"
                        aria-selected={view === 'answer'}
                        className={view === 'answer' ? 'on' : ''}
                        onClick={() => setView('answer')}
                      >
                        <CheckCircle2 size={15} /> Answer
                      </button>
                    </div>
                    <button
                      className="icon-btn"
                      onClick={() => go(-1)}
                      aria-label="Previous question"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      className="icon-btn"
                      onClick={() => go(1)}
                      aria-label="Next question"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="topical-frame">
                  <iframe
                    key={`${selected.id}-${view}`}
                    src={`${fileUrl}#view=FitH&toolbar=0&navpanes=0`}
                    title={`${sourceOf(selected)} — ${view}`}
                  />
                </div>
              </>
            ) : (
              <div className="topical-placeholder">
                <Lock size={20} />
                {component === 'P4'
                  ? 'Pick a topic to start practising.'
                  : 'Worked questions for this component are coming soon.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="topical-field">
      <span className="topical-field-label">{label}</span>
      {children}
    </label>
  )
}

function Select({ value, onChange, options, includeAll, disabled }) {
  return (
    <div className="topical-select">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        {includeAll && <option value="all">{includeAll}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} aria-hidden="true" />
    </div>
  )
}

// Multi-select dropdown with checkboxes. Empty selection = "All topics".
function MultiSelect({
  options,
  selected,
  onChange,
  disabled,
  allLabel = 'All topics',
  noun = 'topics',
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const label =
    selected.length === 0
      ? allLabel
      : selected.length === 1
      ? options.find((o) => o.value === selected[0])?.label
      : `${selected.length} ${noun} selected`

  const toggle = (val) =>
    onChange(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val]
    )

  return (
    <div className="topical-multi" ref={ref}>
      <button
        type="button"
        className="topical-multi-trigger"
        disabled={disabled}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="topical-multi-label">{label}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open && !disabled && (
        <div className="topical-multi-panel" role="listbox" aria-multiselectable="true">
          <button
            type="button"
            className="topical-multi-opt"
            onClick={() => onChange([])}
          >
            <span className={`topical-check ${selected.length === 0 ? 'on' : ''}`}>
              {selected.length === 0 && <Check size={12} />}
            </span>
            {allLabel}
          </button>
          {options.map((o) => {
            const on = selected.includes(o.value)
            return (
              <button
                key={o.value}
                type="button"
                className="topical-multi-opt"
                role="option"
                aria-selected={on}
                onClick={() => toggle(o.value)}
              >
                <span className={`topical-check ${on ? 'on' : ''}`}>
                  {on && <Check size={12} />}
                </span>
                {o.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
