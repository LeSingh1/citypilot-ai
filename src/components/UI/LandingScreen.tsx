import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, ArrowRight, Building2, GraduationCap, Bus, Leaf, Shield, CheckCircle } from 'lucide-react'
import { useCityStore } from '@/stores/cityStore'
import type { CityProfile } from '@/types/city.types'
import { SandboxBuilder } from './SandboxBuilder'

interface Props {
  onEnter: () => void
}

export function LandingScreen({ onEnter }: Props) {
  const [sandboxOpen, setSandboxOpen] = useState(false)
  const cities = useCityStore((state) => state.cities)
  const selectCity = useCityStore((state) => state.selectCity)

  const demoCity = cities.find((c) => c.id === 'fremon')
  const extraCities = cities.filter((c) => c.id !== 'fremon' && ['fremont', 'san_jose'].includes(c.id))

  const chooseCity = (city: CityProfile) => {
    selectCity(city)
    onEnter()
  }

  return (
    <div className="relative min-h-screen overflow-auto noise-overlay" style={{ background: 'var(--color-bg-app)' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-3">
            <CityPilotIcon />
            <div>
              <div className="font-display font-bold tracking-wider uppercase" style={{ fontSize: 22, color: 'var(--color-accent-cyan)', letterSpacing: '0.12em' }}>
                CityPilot AI
              </div>
              <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                AI planning copilot for fast-growing cities
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ color: 'var(--color-accent-green)', border: '1px solid rgba(0,184,148,0.28)', background: 'rgba(0,184,148,0.07)' }}>
              Live Demo
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ color: 'var(--color-accent-cyan)', border: '1px solid rgba(0,212,255,0.28)', background: 'rgba(0,212,255,0.07)' }}>
              Creator Colosseum 2025
            </span>
          </div>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-8 mb-8 relative overflow-hidden"
          style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border-light)', boxShadow: 'var(--shadow-lg)' }}
        >
          <ScrewCorners />
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent-cyan)' }}>
              The Problem
            </div>
            <h1 className="font-display font-bold mb-4" style={{ fontSize: 34, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
              Cities grow faster than planning teams can evaluate infrastructure tradeoffs.
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.75 }} className="mb-6">
              Traditional feasibility studies cost{' '}
              <strong style={{ color: 'var(--color-text-primary)' }}>$50K–$200K</strong> and take months.
              By then, the growth window has already closed.
              CityPilot AI gives planning teams scenario analysis in{' '}
              <strong style={{ color: 'var(--color-accent-cyan)' }}>under a minute</strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              {demoCity && (
                <motion.button
                  onClick={() => chooseCity(demoCity)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-sm tracking-wide"
                  style={{ background: 'var(--color-accent-cyan)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '4px 4px 12px rgba(0,0,0,0.25)' }}
                >
                  Launch Demo — Fremon City
                  <ArrowRight size={16} />
                </motion.button>
              )}
              <motion.button
                onClick={() => setSandboxOpen(true)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-sm"
                style={{ background: 'var(--color-bg-hover)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-subtle)' }}
              >
                <Plus size={15} />
                Build Custom City
              </motion.button>
            </div>
          </div>
          <div className="absolute right-8 top-8 hidden lg:block opacity-30 pointer-events-none">
            <HeroCityGraphic />
          </div>
        </motion.div>

        {/* ── Solution row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: 'var(--color-text-muted)' }}>
            What CityPilot AI does
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: '🔍', label: 'Detects Gaps', desc: 'Maps underserved zones — emergency, transit, education, green space' },
              { icon: '📊', label: 'Simulates Growth', desc: 'Projects impact under 10–50% population growth scenarios' },
              { icon: '🤖', label: 'Recommends Infrastructure', desc: 'AI scores and ranks investments by equity, cost, and coverage' },
              { icon: '📄', label: 'Generates Reports', desc: 'Produces planning memos with before/after metrics instantly' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-4" style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border-subtle)' }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>{item.label}</div>
                <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: 11 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Main grid: Demo + Sidebar cards ── */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* Demo cities */}
          <div className="lg:col-span-2">
            <div className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Select a city to start the demo
            </div>
            <div className="grid gap-4">
              {demoCity && (
                <FeaturedCityCard city={demoCity} onSelect={chooseCity} />
              )}
              {extraCities.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {extraCities.map((city) => (
                    <CityCard key={city.id} city={city} onSelect={chooseCity} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: ROI + Pricing */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl p-5"
              style={{ background: 'var(--color-bg-panel)', border: '1px solid rgba(0,184,148,0.3)' }}
            >
              <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent-green)' }}>
                ROI vs. Traditional Studies
              </div>
              {[
                { label: 'Analysis time', before: 'Weeks', after: 'Under 1 min' },
                { label: 'Feasibility report', before: '$50K+', after: 'Instant' },
                { label: 'Service gap map', before: 'Manual GIS', after: 'AI-generated' },
                { label: 'Before/after metrics', before: 'Estimated', after: 'Quantified' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] line-through" style={{ color: 'var(--color-text-muted)' }}>{row.before}</span>
                    <span className="font-mono text-[10px] font-bold" style={{ color: 'var(--color-accent-green)' }}>{row.after}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-xl p-5"
              style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border-subtle)' }}
            >
              <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent-cyan)' }}>
                Pricing (SaaS)
              </div>
              {[
                { tier: 'Starter', price: '$299/mo', desc: 'Small city simulations' },
                { tier: 'Team', price: '$999/mo', desc: 'Planning departments', highlight: true },
                { tier: 'Enterprise', price: 'Custom', desc: 'Regional agencies' },
              ].map((p) => (
                <div
                  key={p.tier}
                  className="rounded-lg px-3 py-2 mb-2"
                  style={{
                    background: p.highlight ? 'rgba(0,212,255,0.08)' : 'var(--color-bg-hover)',
                    border: p.highlight ? '1px solid rgba(0,212,255,0.28)' : '1px solid var(--color-border-subtle)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{p.tier}</span>
                    <span className="font-mono text-sm font-bold" style={{ color: p.highlight ? 'var(--color-accent-cyan)' : 'var(--color-text-secondary)' }}>{p.price}</span>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 10 }}>{p.desc}</p>
                </div>
              ))}
              <p style={{ color: 'var(--color-text-muted)', fontSize: 9, marginTop: 8 }}>Demo pricing — not a payment integration</p>
            </motion.div>
          </div>
        </div>

        {/* ── Customers ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-8"
        >
          <div className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Who uses CityPilot AI
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { icon: Building2, label: 'City Planning Depts', desc: 'Early feasibility before expensive studies' },
              { icon: GraduationCap, label: 'School Districts', desc: 'Enrollment growth and site capacity' },
              { icon: Bus, label: 'Transit Agencies', desc: 'Coverage gaps and route planning' },
              { icon: Leaf, label: 'Climate Teams', desc: 'Green infra and resilience mapping' },
              { icon: Shield, label: 'Real Estate Developers', desc: 'Infrastructure risk before land purchase' },
            ].map((c) => (
              <div key={c.label} className="rounded-xl p-4" style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border-subtle)' }}>
                <c.icon size={18} style={{ color: 'var(--color-accent-cyan)', marginBottom: 8 }} />
                <div className="font-display font-semibold text-xs mb-1" style={{ color: 'var(--color-text-primary)' }}>{c.label}</div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 10, lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Demo Flow Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl p-5 mb-6"
          style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border-subtle)' }}
        >
          <div className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Core demo flow
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['Select Fremon City', 'Analyze Infrastructure Gaps', 'Apply AI Plan', 'See Metrics Improve', 'Generate Report'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border-subtle)' }}>
                  <span className="font-mono text-[10px] font-bold" style={{ color: 'var(--color-accent-cyan)' }}>{i + 1}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{step}</span>
                </div>
                {i < arr.length - 1 && <span style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Business Value footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="rounded-xl p-4"
          style={{ background: 'rgba(0,184,148,0.06)', border: '1px solid rgba(0,184,148,0.2)' }}
        >
          <div className="flex flex-wrap gap-3 items-center">
            <CheckCircle size={16} style={{ color: 'var(--color-accent-green)', flexShrink: 0 }} />
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Business value:</strong>{' '}
              CityPilot AI gives planning teams an early scenario report before commissioning expensive external studies — turning months of work into minutes.
            </p>
          </div>
        </motion.div>

      </div>

      <AnimatePresence>
        {sandboxOpen && (
          <SandboxOverlay onClose={() => setSandboxOpen(false)} onGenerated={onEnter} />
        )}
      </AnimatePresence>
    </div>
  )
}

function FeaturedCityCard({ city, onSelect }: { city: CityProfile; onSelect: (c: CityProfile) => void }) {
  return (
    <motion.button
      onClick={() => onSelect(city)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className="w-full text-left rounded-xl overflow-hidden"
      style={{ background: 'var(--color-bg-panel)', border: '1px solid rgba(0,212,255,0.25)', boxShadow: 'var(--shadow-md)' }}
    >
      <div className="relative flex items-end p-5 h-28" style={{ background: 'linear-gradient(135deg, #e8e0d8 0%, #d8d0c8 100%)' }}>
        <ScrewCornersSmall />
        <div>
          <div className="font-mono mb-1" style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase' }}>
            Featured Demo City · AI-Generated
          </div>
          <h3 className="font-display font-bold text-xl" style={{ color: 'var(--color-text-primary)' }}>
            Fremon City
          </h3>
        </div>
        <div className="absolute top-3 right-3">
          <span className="font-mono uppercase tracking-widest px-2 py-1 rounded-full" style={{ fontSize: 9, background: 'rgba(0,212,255,0.15)', color: 'var(--color-accent-cyan)', border: '1px solid rgba(0,212,255,0.3)' }}>
            Demo Ready
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)', fontSize: 12, lineHeight: 1.6 }}>
          {city.key_planning_challenge}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {['Emergency', 'Transit', 'Education', 'Green'].map((tag) => (
              <span key={tag} className="font-mono uppercase tracking-widest px-2 py-0.5 rounded" style={{ fontSize: 9, background: 'var(--color-bg-hover)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border-subtle)' }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono font-bold shrink-0" style={{ fontSize: 11, background: 'var(--color-accent-cyan)', color: '#fff' }}>
            Start Demo →
          </div>
        </div>
      </div>
    </motion.button>
  )
}

function CityCard({ city, onSelect }: { city: CityProfile; onSelect: (c: CityProfile) => void }) {
  return (
    <motion.button
      onClick={() => onSelect(city)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left rounded-xl overflow-hidden"
      style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="relative flex items-end p-4 h-20" style={{ background: cityColorLight(city.id) }}>
        <h3 className="font-display font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
          {city.name}
        </h3>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)', fontSize: 11, lineHeight: 1.5 }}>
          {city.key_planning_challenge}
        </p>
        <div className="inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono font-bold" style={{ fontSize: 10, color: 'var(--color-accent-cyan)', border: '1px solid rgba(0,212,255,0.25)' }}>
          Simulate →
        </div>
      </div>
    </motion.button>
  )
}

function SandboxOverlay({ onClose, onGenerated }: { onClose: () => void; onGenerated: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-auto p-8"
      style={{ background: 'var(--color-bg-app)' }}
    >
      <button
        onClick={onClose}
        className="fixed top-5 right-5 flex items-center justify-center w-9 h-9 rounded-lg"
        style={{ border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)', background: 'var(--color-bg-panel)' }}
        aria-label="Close sandbox builder"
      >
        <X size={16} />
      </button>
      <SandboxBuilder onGenerated={() => { onClose(); onGenerated() }} />
    </motion.div>
  )
}

export function Logo({ large = false }: { large?: boolean }) {
  return (
    <div className="inline-flex items-center gap-1">
      <span
        className="font-display font-bold tracking-wider uppercase"
        style={{ fontSize: large ? 26 : 14, color: 'var(--color-accent-cyan)', letterSpacing: '0.12em' }}
      >
        CityPilot
      </span>
      <span
        className="font-display font-bold"
        style={{ fontSize: large ? 26 : 14, color: 'var(--color-text-primary)', letterSpacing: '0.06em' }}
      >
        AI
      </span>
    </div>
  )
}

function CityPilotIcon() {
  return (
    <svg width={36} height={30} viewBox="0 0 56 44" aria-hidden="true">
      <path
        d="M4 40V22h7V10h9v30h5V16h8v24h5V4h11v36h4v4H1v-4h3z"
        fill="var(--color-accent-cyan)"
        style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}
      />
    </svg>
  )
}

function HeroCityGraphic() {
  return (
    <svg width={220} height={150} viewBox="0 0 240 160" fill="none" aria-hidden="true">
      <rect x="20" y="80" width="20" height="80" fill="var(--color-accent-cyan)" opacity="0.35" />
      <rect x="50" y="50" width="25" height="110" fill="var(--color-accent-cyan)" opacity="0.45" />
      <rect x="85" y="30" width="30" height="130" fill="var(--color-accent-cyan)" opacity="0.55" />
      <rect x="125" y="60" width="22" height="100" fill="var(--color-accent-cyan)" opacity="0.4" />
      <rect x="157" y="40" width="28" height="120" fill="var(--color-accent-cyan)" opacity="0.5" />
      <rect x="195" y="70" width="18" height="90" fill="var(--color-accent-cyan)" opacity="0.35" />
      <line x1="0" y1="158" x2="240" y2="158" stroke="var(--color-border-subtle)" strokeWidth="1" />
    </svg>
  )
}

function ScrewCorners() {
  const positions: React.CSSProperties[] = [
    { top: 10, left: 10 }, { top: 10, right: 10 },
    { bottom: 10, left: 10 }, { bottom: 10, right: 10 },
  ]
  return (
    <>
      {positions.map((pos, i) => (
        <div key={i} style={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: 'var(--color-border-subtle)', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.8)', ...pos }} />
      ))}
    </>
  )
}

function ScrewCornersSmall() {
  const positions: React.CSSProperties[] = [
    { top: 6, left: 6 }, { top: 6, right: 6 },
    { bottom: 6, left: 6 }, { bottom: 6, right: 6 },
  ]
  return (
    <>
      {positions.map((pos, i) => (
        <div key={i} style={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', background: 'rgba(0,0,0,0.15)', ...pos }} />
      ))}
    </>
  )
}

function cityColorLight(id: string): string {
  const map: Record<string, string> = {
    fremont: '#d8e8d0',
    fremon: '#e8e0d8',
    san_jose: '#d8d0e8',
  }
  return map[id] ?? '#cdd5e0'
}
