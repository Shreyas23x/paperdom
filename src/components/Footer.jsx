import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import Logo from './Logo'

export default function Footer({ cta = true }) {
  return (
    <>
      {cta && (
        <section style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal>
              <div className="cta-band">
                <h2>We do this for free.</h2>
                <p>
                  If you like our work, please share the website with friends and
                  family. ~ The Team
                </p>
                <div className="hero-actions" style={{ marginTop: 0 }}>
                  <a href="#papers" className="btn btn-primary">
                    Browse the library <ArrowRight size={18} />
                  </a>
                  <a href="#faq" className="btn btn-ghost">
                    Read the FAQ
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <a href="#top" className="brand">
                <Logo className="brand-mark" />
                Paperdome<span className="dot">.</span>
              </a>
              <p>
                Fully worked, step-by-step solutions for CIE International A-Level 9231
                Further Mathematics. Learn the method, master the marks.
              </p>
              <span className="footer-domain">pastpaperdome.in</span>
            </div>
            <div className="footer-col">
              <h4>Library</h4>
              <a href="#papers">All papers</a>
              <a href="#papers">Further Mechanics</a>
              <a href="#papers">Probability &amp; Statistics</a>
              <a href="#papers">Coming soon</a>
            </div>
            <div className="footer-col">
              <h4>Learn</h4>
              <a href="#showcase">See it in action</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-col">
              <h4>Syllabus</h4>
              <a href="#papers">Paper 1 · Pure 1</a>
              <a href="#papers">Paper 2 · Pure 2</a>
              <a href="#papers">Paper 3 · Mechanics</a>
              <a href="#papers">Paper 4 · Prob &amp; Stats</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Paperdome · pastpaperdome.in — An independent study resource.</span>
            <span>
              Not affiliated with or endorsed by Cambridge Assessment International
              Education.
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
