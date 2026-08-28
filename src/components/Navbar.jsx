import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from './Logo'

const links = [
  { label: 'Topical', href: '#/topical' },
  // Re-add when the Makers section is toggled back on in App.jsx:
  // { label: 'Makers', href: '#makers' },
  { label: 'In action', href: '#showcase' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="container">
        <div className="nav-inner glass">
          <a href="#top" className="brand" aria-label="Paperdome home">
            <Logo className="brand-mark" />
            Paperdome
          </a>

          <div className="nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="nav-cta">
            <a href="#papers" className="btn btn-primary btn-sm">
              Browse papers <ArrowRight size={16} />
            </a>
            <button
              className="nav-toggle btn-ghost"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
