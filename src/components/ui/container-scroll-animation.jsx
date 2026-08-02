import React, { useRef } from 'react'
import { useMotionValue, useTransform, motion } from 'framer-motion'

/**
 * ContainerScroll
 * Adapted from the Aceternity "container-scroll-animation" component.
 *
 * Original was Next.js + TypeScript + Tailwind. This project is React + Vite +
 * JavaScript + plain CSS, so the Tailwind utility classes were mapped to the
 * `.cs-*` rules in src/index.css and the types removed.
 *
 * The original drives the animation with framer-motion's `useScroll({ target })`.
 * That proved unreliable to verify here, so the scroll progress is computed
 * directly from getBoundingClientRect on a passive scroll listener and pushed
 * into a framer MotionValue. The visual result (rotateX 20→0, scale, translateY)
 * is identical, but it's robust and not dependent on framer's scroll observer.
 * framer-motion is still the only external dependency.
 */
const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null)
  const progress = useMotionValue(0)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the element's top reaches the top of the viewport,
      // 1 when its bottom reaches the bottom of the viewport.
      const span = vh - rect.height
      const p = span !== 0 ? clamp(rect.top / span, 0, 1) : 0
      progress.set(p)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [progress])

  const rotate = useTransform(progress, [0, 1], [20, 0])
  const translate = useTransform(progress, [0, 1], [0, -100])
  const scale = useTransform(progress, (v) => {
    const [from, to] = isMobile ? [0.7, 0.9] : [1.05, 1]
    return from + (to - from) * v
  })

  return (
    <div className="cs-wrapper" ref={containerRef}>
      <div className="cs-inner" style={{ perspective: '1000px' }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div style={{ translateY: translate }} className="cs-header">
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="cs-card"
    >
      <div className="cs-card-inner">{children}</div>
    </motion.div>
  )
}
