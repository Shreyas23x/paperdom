import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import Reveal from './Reveal'

const faqs = [
  {
    q: 'What exactly is 9231?',
    a: '9231 is the Cambridge International (CIE) A-Level in Further Mathematics. It is examined across four components: Further Pure Mathematics 1 & 2, Further Mechanics, and Further Probability & Statistics.',
  },
  {
    q: 'Are the solutions complete and reliable?',
    a: 'Yes. Each available paper is worked through question by question, with the method laid out step by step following the official mark scheme logic — so you can see precisely how each mark is awarded.',
  },
  {
    q: 'Can I read papers without downloading anything?',
    a: 'Absolutely. Click “Solutions” on any solved paper and it opens in a built-in reader right on the page. You can also download the PDF if you prefer to revise offline or print it.',
  },
  {
    q: 'Which papers are available right now?',
    a: 'The library currently includes fully solved Further Mechanics papers (2021) and Further Probability & Statistics papers (2022 and 2025). More sessions and the Pure components are being added — those appear as “coming soon” cards.',
  },
  {
    q: 'Is Paperdoma affiliated with Cambridge / CIE?',
    a: 'No. Paperdoma is an independent study resource. “Cambridge”, “CIE” and the 9231 syllabus code belong to Cambridge Assessment International Education. We simply provide worked solutions to help students learn.',
  },
]

function Item({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item glass ${isOpen ? 'open' : ''}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={isOpen}>
        {item.q}
        <Plus size={20} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="faq-a">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Questions, answered</h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="faq-wrap">
            {faqs.map((f, i) => (
              <Item
                key={f.q}
                item={f}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
