import { CheckCircle2 } from 'lucide-react'
import { ContainerScroll } from './ui/container-scroll-animation'

// A real worked-solutions paper rendered inside the scroll card — a live demo
// of the product. Shows the top of a Further Probability & Statistics paper
// fitted to width, framed like Paperdome's inline reader.
function PaperDemo() {
  return (
    <div className="paper-demo">
      <div className="paper-demo-bar">
        <span className="subj-badge" style={{ '--accent': 'var(--subj-p4)' }}>
          Paper 4
        </span>
        <span className="paper-demo-title">
          Further Probability &amp; Statistics · M/J 2022 · V1
        </span>
        <span className="solved-ribbon">
          <CheckCircle2 size={13} /> Solved
        </span>
      </div>
      <iframe
        className="paper-demo-frame"
        src="/papers/9231_s22_qp_41_solved.pdf#view=FitH&toolbar=0&navpanes=0&statusbar=0&page=3"
        title="Further Probability & Statistics worked-solutions preview"
        loading="lazy"
      />
    </div>
  )
}

export default function ScrollShowcase() {
  return (
    <section id="showcase" style={{ padding: 0 }}>
      <ContainerScroll
        titleComponent={
          <>
            <span className="eyebrow">Take a closer look</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                letterSpacing: '-0.015em',
                lineHeight: 1.05,
                marginTop: 6,
              }}
            >
              The library <span style={{ fontStyle: 'italic' }}>in focus</span>
            </h2>
            <p
              style={{
                color: 'var(--ink-muted)',
                maxWidth: '46ch',
                margin: '14px auto 0',
                fontSize: '1.05rem',
              }}
            >
              A closer look at Paperdome. Clean, fast and built around the work
              itself.
            </p>
          </>
        }
      >
        <PaperDemo />
      </ContainerScroll>
    </section>
  )
}
