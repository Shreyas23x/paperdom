// Display cards — adapted from the shadcn / Aceternity "display-cards" component
// (https://ui.aceternity.com) to plain JavaScript + CSS for this project.
// The original ships as a Tailwind/TS component using `cn` + utility classes;
// here the styling lives in index.css under `.display-card*`, monochrome, with
// the signature behaviour kept: glass surface, muted/grayscale by default that
// regains tone and lifts on hover. No Tailwind / cn / TS.
//
// Generic slot-based API so the card stays reusable:
//   badge       top-left chip (e.g. a "Paper 4" pill)
//   ribbon      top-right element, absolutely placed (e.g. a "Solved" ribbon)
//   title       primary heading
//   description one supporting line
//   footer      action row (buttons, "coming soon", …)
//   accent      CSS color for the left rail (defaults to --color-primary)
//   locked      dims/dashes the card for "coming soon" states

export function DisplayCard({
  className = '',
  accent,
  locked = false,
  badge,
  ribbon,
  title,
  description,
  footer,
}) {
  return (
    <div
      className={`display-card ${locked ? 'is-locked' : ''} ${className}`}
      style={accent ? { '--accent': accent } : undefined}
    >
      {ribbon && <span className="display-card-ribbon">{ribbon}</span>}
      <div className="display-card-head">{badge}</div>
      <h3 className="display-card-title">{title}</h3>
      {description && <p className="display-card-desc">{description}</p>}
      {footer && <div className="display-card-foot">{footer}</div>}
    </div>
  )
}

export default function DisplayCards({ cards = [] }) {
  return (
    <div className="display-cards">
      {cards.map((c, i) => (
        <DisplayCard key={c.key ?? i} {...c} />
      ))}
    </div>
  )
}
