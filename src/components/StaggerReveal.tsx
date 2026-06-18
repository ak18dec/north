import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../animations/variants'

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  /** Reveal on scroll into view instead of immediately */
  onScroll?: boolean
}

export function StaggerReveal({ children, className, onScroll }: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      {...(onScroll
        ? { whileInView: 'show', viewport: { once: true, amount: 0.2 } }
        : { animate: 'show' })}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  )
}

export default StaggerReveal
