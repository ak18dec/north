import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ChipInput from '../components/ChipInput'
import { useLocalStorage } from '../hooks/useLocalStorage'

export interface ProfileData {
  skills: string[]
  experience: string
  goal: string
  interests: string[]
  avoid: string[]
}

const experienceLevels = ['Junior', 'Mid', 'Senior', 'Staff', 'Principal', 'Architect']
const goals = ['Senior Engineer', 'Staff Engineer', 'Principal', 'Architect', 'AI/ML', 'Founder']

const defaultProfile: ProfileData = {
  skills: [],
  experience: 'Senior',
  goal: 'Staff Engineer',
  interests: [],
  avoid: [],
}

export default function Profile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useLocalStorage<ProfileData>('north-profile', defaultProfile)

  const update = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  const loadExample = () => {
    setProfile({
      skills: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'System Design'],
      experience: 'Senior',
      goal: 'Staff Engineer',
      interests: ['Distributed Systems', 'AI Tooling', 'Performance'],
      avoid: ['Crypto', 'Frontend Frameworks'],
    })
  }

  const generate = () => {
    // profile is already persisted via useLocalStorage
    navigate('/generation')
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl px-5 pb-28 pt-28">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Build your profile</h1>
            <p className="mt-2 text-secondary">
              The more context you give North, the sharper your feed. Nothing leaves your browser.
            </p>
          </div>
          <button
            onClick={loadExample}
            className="glass glass-hover flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
            style={{ borderRadius: 12 }}
          >
            <Wand2 size={15} className="text-accent-violet" /> Example
          </button>
        </div>

        <div className="flex flex-col gap-7">
          <ChipInput
            label="Your skills"
            placeholder="Type a skill and press Enter…"
            values={profile.skills}
            onChange={(v) => update('skills', v)}
            variant="accent"
          />

          <div>
            <label className="mb-2 block text-sm font-semibold">Experience level</label>
            <div className="flex flex-wrap gap-2">
              {experienceLevels.map((level) => {
                const active = profile.experience === level
                return (
                  <button
                    key={level}
                    onClick={() => update('experience', level)}
                    className="rounded-xl px-4 py-2 text-sm font-medium transition-all"
                    style={{
                      background: active ? 'linear-gradient(120deg, #3B82F6, #7C3AED)' : 'var(--surface)',
                      color: active ? '#fff' : 'var(--text-primary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {level}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Career goal</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {goals.map((goal) => {
                const active = profile.goal === goal
                return (
                  <button
                    key={goal}
                    onClick={() => update('goal', goal)}
                    className="glass rounded-xl px-4 py-3 text-sm font-medium transition-all"
                    style={{
                      borderRadius: 12,
                      borderColor: active ? 'var(--accent-violet)' : 'var(--border)',
                      borderWidth: active ? 2 : 1,
                      color: active ? 'var(--accent-violet)' : 'var(--text-primary)',
                    }}
                  >
                    {goal}
                  </button>
                )
              })}
            </div>
          </div>

          <ChipInput
            label="Interests"
            placeholder="Topics you want more of…"
            values={profile.interests}
            onChange={(v) => update('interests', v)}
          />

          <ChipInput
            label="Avoid topics"
            placeholder="Topics to filter out…"
            values={profile.avoid}
            onChange={(v) => update('avoid', v)}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generate}
            className="flex items-center justify-center gap-2 rounded-2xl gradient-bg px-6 py-4 text-base font-semibold text-white shadow"
            style={{ borderRadius: 16 }}
          >
            <Sparkles size={18} /> Generate My Feed <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
