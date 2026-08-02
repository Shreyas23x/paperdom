/**
 * LiquidButton — "liquid glass" button.
 *
 * Adapted from the shadcn/Tailwind/TypeScript original to this project's
 * React + Vite + JavaScript + plain-CSS stack. The original relied on `cva`,
 * `@radix-ui/react-slot` and `cn` (Tailwind class merging) purely to compose
 * utility classes — none are needed here, so they aren't installed. The actual
 * liquid-glass effect is two things, both preserved exactly:
 *   1. <GlassFilter/> — an SVG feTurbulence + feDisplacementMap filter applied
 *      via `backdrop-filter: url(#container-glass)` (see .liquid-btn-distort).
 *   2. the multi-layer inset box-shadow rim (see .liquid-btn-rim in index.css).
 *
 * Browser note: SVG-backed backdrop-filter is supported in Chromium (Chrome/
 * Edge). Where unsupported (Safari/Firefox) the button degrades gracefully to
 * the glass rim without the refractive distortion.
 *
 * Render <GlassFilter/> once anywhere on the page so #container-glass exists.
 */
export function LiquidButton({ active = false, className = '', children, ...props }) {
  const cls = ['liquid-btn', active ? 'active' : '', className].filter(Boolean).join(' ')
  return (
    <button className={cls} aria-pressed={active} {...props}>
      <span className="liquid-btn-rim" aria-hidden="true" />
      <span className="liquid-btn-distort" aria-hidden="true" />
      <span className="liquid-btn-content">{children}</span>
    </button>
  )
}

export function GlassFilter() {
  return (
    <svg className="lg-svg" aria-hidden="true" focusable="false">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}
