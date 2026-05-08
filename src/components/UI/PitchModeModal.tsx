import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Building2, GraduationCap, Bus, Leaf, Shield } from 'lucide-react'
import { createPortal } from 'react-dom'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function PitchModeModal({ isOpen, onClose }: Props) {
  return createPortal(
    <AnimatePresence>
      {isOpen && <PitchPanel onClose={onClose} />}
    </AnimatePresence>,
    document.body
  )
}

function PitchPanel({ onClose }: { onClose: () => void }) {
  const slides = [
    { id: 'problem', label: 'Problem', color: 'var(--color-accent-danger)' },
    { id: 'solution', label: 'Solution', color: 'var(--color-accent-cyan)' },
    { id: 'demo', label: 'Demo', color: 'var(--color-accent-purple)' },
    { id: 'impact', label: 'Impact', color: 'var(--color-accent-green)' },
    { id: 'customers', label: 'Customers', color: 'var(--color-accent-cyan)' },
    { id: 'model', label: 'Business Model', color: 'var(--color-accent-green)' },
    { id: 'next', label: 'Next Steps', color: 'var(--color-text-primary)' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        style={{
          width: 820,
          maxWidth: '95vw',
          maxHeight: '90vh',
          overflow: 'auto',
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border-light)',
          borderRadius: 14,
          boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div>
            <div className="font-display font-bold text-xl" style={{ color: 'var(--color-accent-cyan)' }}>
              CityPilot AI — Pitch Mode
            </div>
            <div className="font-mono text-[10px] tracking-widest uppercase mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Creator Colosseum Startup Competition · 2025
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {slides.map((s) => (
                <div key={s.id} className="w-1.5 h-1.5 rounded-full" style={{ background: s.color, opacity: 0.7 }} />
              ))}
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg grid place-items-center" style={{ border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-muted)' }}>
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* 1. Problem */}
          <PitchSection id="problem" label="01 — Problem" color="var(--color-accent-danger)">
            <div className="grid grid-cols-3 gap-4">
              <StatCard value="$100K+" label="Average feasibility study cost" />
              <StatCard value="3–6 mo" label="Typical study timeline" />
              <StatCard value="40%" label="Avg US cities growing faster than plans" />
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--color-text-secondary)' }}>
              Small and midsize cities are making billion-dollar infrastructure decisions using guesswork. By the time a formal study is complete, the growth window has closed. Planning teams have no affordable way to test scenarios before committing budget.
            </p>
          </PitchSection>

          {/* 2. Solution */}
          <PitchSection id="solution" label="02 — Solution" color="var(--color-accent-cyan)">
            <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)' }}>
              <div className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--color-accent-cyan)' }}>CityPilot AI</div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                An AI planning copilot that simulates growth, detects service gaps, recommends infrastructure investments, and generates planning reports — in under a minute.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                '🔍 Detects emergency, transit, education, and green space gaps',
                '📊 Simulates 10–50% growth scenarios on real city bounds',
                '🤖 AI scores and ranks infrastructure by equity, cost, and coverage',
                '📄 Generates before/after planning memos instantly',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </PitchSection>

          {/* 3. Demo */}
          <PitchSection id="demo" label="03 — Demo" color="var(--color-accent-purple)">
            <div className="flex flex-wrap items-center gap-2">
              {[
                'Select Fremon City',
                'Analyze Infrastructure Gaps',
                'Review Top Gap: South Emergency Gap',
                'Apply AI Plan: Add South Emergency Clinic',
                'City Health 61 → 82',
                'Generate Planning Report',
              ].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border-subtle)' }}>
                    <span className="font-mono font-bold" style={{ fontSize: 10, color: 'var(--color-accent-purple)' }}>{i + 1}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>{step}</span>
                  </div>
                  {i < arr.length - 1 && <ArrowRight size={12} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />}
                </div>
              ))}
            </div>
            <p className="text-sm mt-4" style={{ color: 'var(--color-text-muted)' }}>
              Live demo runs entirely in the browser — no backend required for the Fremon scenario.
            </p>
          </PitchSection>

          {/* 4. Impact */}
          <PitchSection id="impact" label="04 — Impact" color="var(--color-accent-green)">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard value="61 → 82" label="City Health score" accent="var(--color-accent-green)" />
              <StatCard value="74K" label="Projected residents served" accent="var(--color-accent-green)" />
              <StatCard value="< 1 min" label="Full analysis time" accent="var(--color-accent-green)" />
              <StatCard value="4" label="Infrastructure gaps resolved" accent="var(--color-accent-green)" />
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--color-text-secondary)' }}>
              CityPilot AI analyzed Fremon's fast-growing districts, detected service gaps, recommended targeted infrastructure, and improved City Health from 61 to 82 — generating a full planning memo in under a minute.
            </p>
          </PitchSection>

          {/* 5. Customers */}
          <PitchSection id="customers" label="05 — Customer Segments" color="var(--color-accent-cyan)">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { icon: Building2, label: 'City Planning Depts', desc: 'Early feasibility before formal studies' },
                { icon: GraduationCap, label: 'School Districts', desc: 'Enrollment-driven site capacity' },
                { icon: Bus, label: 'Transit Agencies', desc: 'Coverage gap analysis' },
                { icon: Leaf, label: 'Climate Teams', desc: 'Resilience infrastructure mapping' },
                { icon: Shield, label: 'Real Estate Developers', desc: 'Pre-acquisition risk screening' },
              ].map((c) => (
                <div key={c.label} className="rounded-xl p-3" style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border-subtle)' }}>
                  <c.icon size={16} style={{ color: 'var(--color-accent-cyan)', marginBottom: 6 }} />
                  <div className="font-display font-semibold" style={{ fontSize: 11, color: 'var(--color-text-primary)', marginBottom: 2 }}>{c.label}</div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 10 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </PitchSection>

          {/* 6. Business Model */}
          <PitchSection id="model" label="06 — Business Model" color="var(--color-accent-green)">
            <div className="grid grid-cols-3 gap-4">
              {[
                { tier: 'Starter', price: '$299/mo', desc: 'Small city simulations', features: ['3 city scenarios/mo', 'Gap analysis', 'PDF report export'] },
                { tier: 'Team', price: '$999/mo', desc: 'Planning departments', features: ['Unlimited scenarios', 'Multi-city comparison', 'Custom growth inputs', 'Team collaboration'], highlight: true },
                { tier: 'Enterprise', price: 'Custom', desc: 'Regional agencies & developers', features: ['API access', 'GIS data integration', 'White-label reports', 'Dedicated support'] },
              ].map((p) => (
                <div
                  key={p.tier}
                  className="rounded-xl p-4"
                  style={{
                    background: p.highlight ? 'rgba(0,212,255,0.07)' : 'var(--color-bg-hover)',
                    border: p.highlight ? '1px solid rgba(0,212,255,0.3)' : '1px solid var(--color-border-subtle)',
                  }}
                >
                  <div className="font-display font-bold text-lg" style={{ color: p.highlight ? 'var(--color-accent-cyan)' : 'var(--color-text-primary)' }}>{p.price}</div>
                  <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>{p.tier}</div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 11, marginBottom: 8 }}>{p.desc}</p>
                  <ul className="space-y-1">
                    {p.features.map((f) => (
                      <li key={f} style={{ color: 'var(--color-text-secondary)', fontSize: 10 }}>· {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </PitchSection>

          {/* 7. Next Steps */}
          <PitchSection id="next" label="07 — Next Steps" color="var(--color-text-primary)">
            <div className="grid grid-cols-3 gap-4">
              {[
                { step: '1', title: 'Pilot with 3 cities', desc: 'Partner with Bay Area city planning departments for 90-day pilot program' },
                { step: '2', title: 'GIS Integration', desc: 'Connect to real parcel and census data for higher-fidelity analysis' },
                { step: '3', title: 'Scale to regional agencies', desc: 'ABAG, MTC, and state DOT partnerships for multi-city scenario planning' },
              ].map((n) => (
                <div key={n.step} className="rounded-xl p-4" style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border-subtle)' }}>
                  <div className="font-mono font-bold text-2xl mb-2" style={{ color: 'var(--color-accent-cyan)', opacity: 0.5 }}>{n.step}</div>
                  <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>{n.title}</div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 11, lineHeight: 1.5 }}>{n.desc}</p>
                </div>
              ))}
            </div>
          </PitchSection>

        </div>
      </motion.div>
    </motion.div>
  )
}

function PitchSection({ id, label, color, children }: { id: string; label: string; color: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color }}>
        {label}
      </div>
      {children}
    </section>
  )
}

function StatCard({ value, label, accent }: { value: string; label: string; accent?: string }) {
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border-subtle)' }}>
      <div className="font-display font-bold text-2xl mb-1" style={{ color: accent ?? 'var(--color-text-primary)' }}>{value}</div>
      <div style={{ color: 'var(--color-text-muted)', fontSize: 10 }}>{label}</div>
    </div>
  )
}
