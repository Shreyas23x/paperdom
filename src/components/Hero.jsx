import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <header className="hero container" id="top">
      <motion.div
        className="hero-badge glass"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="tag">9231</span>
        CIE International A-Level · Further Mathematics
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease }}
      >
        Past papers <span className="grad">fully solved</span>.
      </motion.h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
      >
        Paperdome turns every 9231 Further Maths question into a clear, step-by-step
        solution. Read the reasoning, follow the method, and check your working against
        full marks.
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease }}
      >
        <a href="#papers" className="btn btn-primary">
          Open the library <ArrowRight size={18} />
        </a>
        <a href="#showcase" className="btn btn-ghost">
          <Sparkles size={18} /> See it in action
        </a>
      </motion.div>

      <motion.div
        className="hero-trust"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <span><CheckCircle2 size={16} /> Every step shown</span>
        <span><CheckCircle2 size={16} /> Read in-line or download</span>
        <span><CheckCircle2 size={16} /> Topical questions</span>
      </motion.div>
    </header>
  )
}
