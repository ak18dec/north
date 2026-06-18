import { KeyboardEvent, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SkillChip from './SkillChip'

interface ChipInputProps {
  label: string
  placeholder?: string
  values: string[]
  onChange: (values: string[]) => void
  variant?: 'default' | 'accent'
}

export default function ChipInput({
  label,
  placeholder,
  values,
  onChange,
  variant = 'default',
}: ChipInputProps) {
  const [draft, setDraft] = useState('')

  const addChip = (raw: string) => {
    const value = raw.trim()
    if (!value) return
    if (values.some((v) => v.toLowerCase() === value.toLowerCase())) {
      setDraft('')
      return
    }
    onChange([...values, value])
    setDraft('')
  }

  const removeChip = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addChip(draft)
    } else if (e.key === 'Backspace' && draft === '' && values.length > 0) {
      removeChip(values.length - 1)
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      <div
        className="glass flex flex-wrap items-center gap-2 rounded-2xl p-3"
        style={{ borderRadius: 16 }}
      >
        <AnimatePresence initial={false}>
          {values.map((value, i) => (
            <SkillChip
              key={value}
              label={value}
              variant={variant}
              onRemove={() => removeChip(i)}
            />
          ))}
        </AnimatePresence>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addChip(draft)}
          placeholder={values.length === 0 ? placeholder : 'Add more…'}
          className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-secondary"
          style={{ color: 'var(--text-primary)' }}
        />
      </div>
    </div>
  )
}
