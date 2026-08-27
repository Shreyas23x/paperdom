import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { track } from '@vercel/analytics'
import { X, Download, ExternalLink } from 'lucide-react'
import { COMPONENTS } from '../data/papers'

const subjColor = {
  P1: 'var(--subj-p1)',
  P2: 'var(--subj-p2)',
  P3: 'var(--subj-p3)',
  P4: 'var(--subj-p4)',
}

export default function PaperViewer({ paper, onClose }) {
  // Only lock scroll / bind Escape while a paper is actually open. This effect
  // must NOT run on plain mount, or the always-rendered viewer would leave the
  // page permanently scroll-locked.
  useEffect(() => {
    if (!paper) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [paper, onClose])

  return createPortal(
    <AnimatePresence>
      {paper && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${COMPONENTS[paper.component].name} worked solutions`}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <div className="modal-title">
                <span
                  className="subj-badge"
                  style={{ '--accent': subjColor[paper.component] }}
                >
                  {COMPONENTS[paper.component].code}
                </span>
                <h3>
                  {COMPONENTS[paper.component].name} — {paper.label}
                </h3>
              </div>
              <div className="modal-actions">
                <a
                  className="btn btn-ghost btn-sm"
                  href={paper.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} /> New tab
                </a>
                <a
                  className="btn btn-primary btn-sm"
                  href={paper.file}
                  download
                  onClick={() =>
                    track('download', {
                      paper: paper.id,
                      component: paper.component,
                    })
                  }
                >
                  <Download size={16} /> Download
                </a>
                <button
                  className="icon-btn"
                  onClick={onClose}
                  aria-label="Close viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="modal-body">
              <iframe
                src={`${paper.file}#view=FitH`}
                title={`${paper.label} worked solutions`}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
