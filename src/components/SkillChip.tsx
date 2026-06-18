import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface SkillChipProps {
  label: string
  onRemove?: () => void
  variant?: 'default' | 'accent'
}

export default function SkillChip({ label, onRemove, variant = 'default' }: SkillChipProps) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.18 }}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
      style={{
        background:
          variant === 'accent'
            ? 'linear-gradient(120deg, rgba(59,130,246,0.15), rgba(124,58,237,0.15))'
            : 'var(--surface-hover)',
        border: '1px solid var(--border)',
      }}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="flex h-4 w-4 items-center justify-center rounded-full transition-opacity hover:opacity-70"
        >
          <X size={13} />
        </button>
      )}
    </motion.span>
  )
}
