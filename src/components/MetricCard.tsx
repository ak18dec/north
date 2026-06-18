import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { staggerItem } from '../animations/variants'

interface MetricCardProps {
  value: string
  label: string
  icon?: ReactNode
  sublabel?: string
}

export default function MetricCard({ value, label, icon, sublabel }: MetricCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="glass glass-hover flex flex-col gap-1 rounded-2xl p-5"
      style={{ borderRadius: 16 }}
    >
      {icon && (
        <span className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded-xl gradient-bg text-white">
          {icon}
        </span>
      )}
      <span className="text-3xl font-extrabold tracking-tight gradient-text">{value}</span>
      <span className="text-sm font-medium">{label}</span>
      {sublabel && <span className="text-xs text-secondary">{sublabel}</span>}
    </motion.div>
  )
}
