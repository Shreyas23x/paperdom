import { Trophy, Award, GraduationCap } from 'lucide-react'
import Reveal from './Reveal'

// "Who makes Paperdome" — credibility band. Every worked solution is written by
// AS-Level Further Maths students with the results to back it. Achievements are
// shown as the makers' own credentials (no names / photos), monochrome to match.
const makers = [
  {
    icon: Trophy,
    stat: '99',
    unit: 'PUM',
    title: 'Further Mechanics',
    note: 'Full marks in Paper 3 — a perfect score in AS-Level Further Mechanics.',
  },
  {
    icon: Award,
    stat: '50/50',
    unit: '',
    title: 'Probability & Statistics',
    note: 'A flawless raw mark across the Paper 4 exam — nothing dropped.',
  },
  {
    icon: GraduationCap,
    stat: '90+',
    unit: 'PUM',
    title: 'Further Mathematics',
    note: 'A top-band distinction across AS-Level 9231 Further Maths.',
  },
]

export default function Makers() {
  return (
    <section id="makers" aria-label="Who makes Paperdome">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Who makes Paperdome</span>
            <h2>Written by students who topped 9231</h2>
            <p>
              Every solution is worked by AS-Level Further Maths students with the
              results to prove it — so you learn the method from people who actually
              scored the marks.
            </p>
          </div>
        </Reveal>

        <div className="makers-grid">
          {makers.map((m, i) => {
            const Icon = m.icon
            return (
              <Reveal as="div" key={m.title} delay={i * 0.08} className="maker glass">
                <div className="maker-icon">
                  <Icon size={22} />
                </div>
                <div className="maker-stat">
                  {m.stat}
                  {m.unit && <span>{m.unit}</span>}
                </div>
                <h3 className="maker-title">{m.title}</h3>
                <p className="maker-note">{m.note}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
