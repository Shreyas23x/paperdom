import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import ScrollShowcase from './components/ScrollShowcase'
import Makers from './components/Makers'
import PaperCatalog from './components/PaperCatalog'
import Topical from './components/Topical'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

// Tiny hash router. The topical browser is heavy (live PDF iframe), so it lives
// on its own route (#/topical) and only mounts there, keeping the home page light.
const isTopicalRoute = () => window.location.hash.startsWith('#/topical')

// Section toggles — flip to `true` to bring these sections back on the home page.
// (Also re-add the matching nav links in Navbar.jsx when re-enabling.)
const SHOW_STATS = false // the "at a glance" 4-box stats row
const SHOW_MAKERS = false // the "Who makes Paperdome" credibility section

export default function App() {
  const [topical, setTopical] = useState(isTopicalRoute())

  useEffect(() => {
    const onHash = () => {
      const t = isTopicalRoute()
      setTopical(t)
      if (t) {
        window.scrollTo(0, 0)
      } else {
        // Returning to the home page: honour any in-page anchor (#papers …).
        const id = window.location.hash.slice(1)
        if (id && id !== 'top') {
          requestAnimationFrame(() =>
            document.getElementById(id)?.scrollIntoView()
          )
        }
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <Analytics />
      <Background />
      <Navbar />
      {topical ? (
        <main>
          <Topical />
          <Footer cta={false} />
        </main>
      ) : (
        <main>
          <Hero />
          {SHOW_STATS && <Stats />}
          {SHOW_MAKERS && <Makers />}
          <ScrollShowcase />
          <PaperCatalog />
          <FAQ />
          <Footer />
        </main>
      )}
    </>
  )
}
