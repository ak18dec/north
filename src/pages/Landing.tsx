import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Compass,
  Newspaper,
  Github,
  MessageSquare,
  Briefcase,
  Rss,
  Sparkles,
  UserCircle,
  Filter,
  ListChecks,
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { StaggerReveal, StaggerItem } from '../components/StaggerReveal'
import { recommendations } from '../data/recommendations'
import { fadeUp } from '../animations/variants'

const sources = [
  { label: 'HN', icon: <Newspaper size={16} /> },
  { label: 'GitHub', icon: <Github size={16} /> },
  { label: 'Blogs', icon: <Rss size={16} /> },
  { label: 'Reddit', icon: <MessageSquare size={16} /> },
  { label: 'Jobs', icon: <Briefcase size={16} /> },
]

const steps = [
  {
    icon: <UserCircle size={22} />,
    title: 'Tell us your context',
    body: 'Your skills, experience, and where you want to go. Two minutes, no account.',
  },
  {
    icon: <Filter size={22} />,
    title: 'We scan the noise',
    body: 'North reads across sources and filters for signal that matches your trajectory.',
  },
  {
    icon: <ListChecks size={22} />,
    title: 'You learn intentionally',
    body: 'A ranked feed of what actually deserves your attention — with the why made explicit.',
  },
]

const metrics = [
  { value: '12 min', label: 'daily, not 2 hours of scrolling' },
  { value: '87%', label: 'less noise reaching your feed' },
  { value: '3×', label: 'more relevant to your goals' },
]

export default function Landing() {
  const preview = recommendations.slice(0, 3)

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-28">
        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{ borderRadius: 9999 }}
          >
            <Sparkles size={15} className="text-accent-violet" /> Your compass for what to learn next
          </motion.span>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.05 }}
            className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl"
          >
            Learn what <span className="gradient-text">matters.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.12 }}
            className="mt-6 max-w-xl text-lg text-secondary"
          >
            Technology moves faster than any feed you can keep up with. North helps engineers discover what’s worth learning next — and why.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/profile"
              className="flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-3 font-semibold text-white shadow transition-transform hover:scale-[1.03]"
            >
              Try Demo <ArrowRight size={18} />
            </Link>
            <Link
              to="/feed"
              className="glass glass-hover flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
              style={{ borderRadius: 12 }}
            >
              See Example Feed
            </Link>
          </motion.div>
        </section>

        {/* Problem */}
        <section id="about" className="mt-32 scroll-mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Too much content. <span className="text-secondary">Too little progress.</span>
          </h2>
          <div className="mt-12 flex flex-col items-center justify-center gap-8 lg:flex-row">
            <StaggerReveal onScroll className="flex flex-wrap items-center justify-center gap-3">
              {sources.map((s) => (
                <StaggerItem key={s.label}>
                  <div
                    className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                    style={{ borderRadius: 9999 }}
                  >
                    {s.icon} {s.label}
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-secondary"
            >
              <ArrowRight size={28} className="rotate-90 lg:rotate-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass flex items-center gap-2 rounded-2xl px-6 py-4 text-lg font-bold"
              style={{ borderRadius: 16 }}
            >
              <Compass size={22} className="text-accent-blue" /> One intelligent feed
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-32">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <StaggerReveal onScroll className="relative mt-14 grid gap-6 md:grid-cols-3">
            <div
              className="absolute left-0 right-0 top-7 hidden h-px md:block"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--accent-blue), var(--accent-violet), transparent)',
              }}
            />
            {steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="glass glass-hover relative flex h-full flex-col gap-3 rounded-2xl p-6" style={{ borderRadius: 16 }}>
                  <div className="flex items-center gap-3">
                    <span className="gradient-bg flex h-12 w-12 items-center justify-center rounded-xl text-white">
                      {step.icon}
                    </span>
                    <span className="text-3xl font-extrabold text-secondary opacity-40">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm text-secondary">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </section>

        {/* Social proof */}
        <section className="mt-32">
          <StaggerReveal onScroll className="grid gap-6 sm:grid-cols-3">
            {metrics.map((m) => (
              <StaggerItem key={m.value}>
                <div className="glass rounded-2xl p-8 text-center" style={{ borderRadius: 16 }}>
                  <p className="text-5xl font-extrabold tracking-tight gradient-text">{m.value}</p>
                  <p className="mt-2 text-sm text-secondary">{m.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </section>

        {/* Feed preview */}
        <section className="mt-32">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A feed that respects your time</h2>
            <p className="mt-3 text-secondary">Every item earns its place — with the reasoning shown.</p>
          </div>
          <StaggerReveal onScroll className="grid gap-6 md:grid-cols-3">
            {preview.map((rec) => (
              <StaggerItem key={rec.id}>
                <div className="glass glass-hover flex h-full flex-col gap-3 rounded-2xl p-5" style={{ borderRadius: 16 }}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
                      {rec.priority}
                    </span>
                    <span className="text-xs text-secondary">{rec.score}% match</span>
                  </div>
                  <h3 className="font-bold leading-snug">{rec.title}</h3>
                  <p className="line-clamp-3 text-sm text-secondary">{rec.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {rec.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-2 py-0.5 text-xs"
                        style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
          <div className="mt-10 text-center">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 font-semibold text-white shadow transition-transform hover:scale-[1.03]"
            >
              Build your feed <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 border-t pt-10 text-center" style={{ borderColor: 'var(--border)' }}>
          <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
            <span className="gradient-bg flex h-10 w-10 items-center justify-center rounded-xl text-white">
              <Compass size={20} />
            </span>
            <p className="text-secondary">
              North helps engineers spend less time consuming content and more time learning
              intentionally.
            </p>
            <p className="mt-2 text-xs text-secondary">A prototype · Built to validate an idea.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
