import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/papers'
import Reveal from './Reveal'

function useCountUp(target, run) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf
    const start = performance.now()
    const dur = 1100
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target])
  return val
}

function Stat({ value, suffix = '', label }) {
  const ref = useRef(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setRun(true),
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const n = useCountUp(value, run)
  return (
    <div className="stat glass" ref={ref}>
      <div className="num">
        {n}
        {suffix}
      </div>
      <div className="lbl">{label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section aria-label="Library at a glance" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="stats-row">
            <Stat value={stats.solved} label="Fully solved papers" />
            <Stat value={stats.components} label="Components covered" />
            <Stat value={stats.totalMarks} suffix="+" label="Marks worked through" />
            <Stat value={100} suffix="%" label="Steps shown" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
