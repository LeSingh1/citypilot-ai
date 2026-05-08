import { motion, AnimatePresence } from 'framer-motion'
import { Copy, FileText, X, TrendingUp } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useSimulationStore } from '@/stores/simulationStore'
import { STATIC_CITIES } from '@/data/staticCities'

export function PlanningReportModal() {
  const planning = useSimulationStore((s) => s.planning)
  const closeReport = useSimulationStore((s) => s.closeReport)

  return createPortal(
    <AnimatePresence>
      {planning.isReportOpen && <PlanningReport onClose={closeReport} />}
    </AnimatePresence>,
    document.body
  )
}

function PlanningReport({ onClose }: { onClose: () => void }) {
  const planning = useSimulationStore((s) => s.planning)
  const city = STATIC_CITIES.find((item) => item.id === planning.cityId)
  const cityName =
    planning.cityId === 'fremon'
      ? 'Fremon'
      : planning.cityId === 'san_jose'
        ? 'San Jose'
        : (city?.name ?? planning.cityId)
  const before = planning.beforeScores
  const after = planning.afterScores ?? before
  const proposed = planning.infrastructure.filter((item) => item.status === 'proposed')
  const activeGaps = planning.underservedZones.filter((zone) => !zone.isImproved)
  const topGap = planning.underservedZones[0]
  const topItem = planning.aiRecommendations.find((item) => planning.topRecommendation.itemIds?.includes(item.id)) ?? planning.aiRecommendations[0]
  const chBefore = before?.cityHealth ?? '—'
  const chAfter = after?.cityHealth ?? '—'
  const residents = after?.populationServed ?? planning.impactSummary?.residentsServed ?? planning.timelinePopulation ?? '—'
  const totalCost = planning.impactSummary?.budgetUsed ?? after?.totalEstimatedCost ?? (proposed.length ? proposed : planning.aiRecommendations).reduce((sum, item) => sum + item.costEstimate, 0)
  const topCost = topItem?.costEstimate ?? planning.topRecommendation.costEstimate ?? planning.topRecommendation.estimatedCost ?? 0
  const topPopulation = planning.topRecommendation.expectedImpact.populationServed ?? Math.round((city?.population_current ?? planning.timelinePopulation) * 0.018)

  const pitchSummary =
    planning.cityId === 'fremon'
      ? 'CityPilot AI analyzed a fast-growing city, detected service gaps, recommended infrastructure, improved City Health from 61 to 82, and generated a planning memo in under a minute.'
      : `CityPilot AI analyzed ${cityName} under ${planning.growthPercent}% projected growth, detected emergency, education, transit, and green space gaps, recommended a targeted infrastructure plan, and improved City Health from ${chBefore} to ${chAfter} while serving ${typeof residents === 'number' ? residents.toLocaleString() : residents} residents.`

  const reportJson = JSON.stringify(
    {
      product: 'CityPilot AI',
      executiveSummary: `Infrastructure planning report for ${cityName}`,
      selectedCity: cityName,
      growthScenario: `${planning.growthPercent}% over ${planning.horizonYears} years`,
      gaps: planning.underservedZones,
      recommendedAIPlan: planning.topRecommendation,
      proposedInfrastructure: proposed.length ? proposed : planning.aiRecommendations,
      beforeMetrics: before,
      afterMetrics: after,
      cost: planning.cityId === 'fremon' ? '$137M' : `$${((after?.totalEstimatedCost ?? 0) / 1_000_000).toFixed(0)}M`,
      populationServed: residents,
      pitchSummary,
      customerValue: 'Replaces weeks of manual feasibility study with AI-generated scenario analysis in under a minute.',
      businessUseCase: 'Starter $299/mo for small cities. Team $999/mo for planning departments. Enterprise custom for regional agencies.',
      assumptions: [
        'Growth and scores are illustrative for demonstration.',
        `Infrastructure gaps and proposed locations are generated from ${cityName}'s city bounds and growth scenario.`,
      ],
      nextSteps: ['Validate with city GIS data', 'Stakeholder workshops', 'Capital programming'],
    },
    null,
    2
  )

  const copyReport = () => {
    const body = document.getElementById('citypilot-report-body')?.innerText
    navigator.clipboard?.writeText(body ?? reportJson).catch(() => {})
  }
  const copyPitch = () => navigator.clipboard?.writeText(pitchSummary).catch(() => {})
  const downloadJson = () => {
    const blob = new Blob([reportJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `citypilot-${planning.cityId}-planning-report.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[95] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        style={{
          width: 800,
          maxWidth: '94vw',
          maxHeight: '88vh',
          overflow: 'auto',
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 12,
          boxShadow: '0 16px 70px rgba(0,0,0,0.65)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div className="flex items-center gap-2">
            <FileText size={18} style={{ color: 'var(--color-accent-cyan)' }} />
            <div>
              <div className="font-display font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                CityPilot AI Planning Report
              </div>
              <div className="font-mono uppercase tracking-widest" style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>
                {cityName} · {planning.growthPercent}% growth · {planning.horizonYears} yr horizon
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-lg grid place-items-center" style={{ border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-muted)' }}>
            <X size={14} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 px-5 py-3" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <button type="button" onClick={copyReport} className="px-3 py-1.5 rounded-lg" style={{ fontSize: 11, border: '1px solid var(--color-border-subtle)', color: 'var(--color-accent-cyan)' }}>
            Copy Report
          </button>
          <button type="button" onClick={downloadJson} className="px-3 py-1.5 rounded-lg" style={{ fontSize: 11, border: '1px solid var(--color-border-subtle)', color: 'var(--color-accent-purple)' }}>
            Download JSON
          </button>
          <button type="button" onClick={() => window.print()} className="px-3 py-1.5 rounded-lg" style={{ fontSize: 11, border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-muted)' }}>
            Print
          </button>
          <button type="button" onClick={copyPitch} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold" style={{ fontSize: 11, border: '1px solid rgba(0,184,148,0.4)', color: 'var(--color-accent-green)', background: 'rgba(0,184,148,0.06)' }}>
            <Copy size={11} />
            Copy Pitch Summary
          </button>
        </div>

        <div id="citypilot-report-body" className="p-5 space-y-5">

          {/* Executive Summary */}
          <ReportSection title="Executive Summary" color="var(--color-accent-cyan)">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              CityPilot AI analyzed <strong>{cityName}</strong>, identified infrastructure gaps under {planning.growthPercent}% projected growth, recommended a targeted AI plan, and measured before-and-after improvement.
            </p>
            <div className="mt-3 rounded-lg p-3" style={{ border: '1px solid rgba(0,184,148,0.3)', background: 'rgba(0,184,148,0.06)' }}>
              <div className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 9, color: 'var(--color-accent-green)' }}>Pitch Summary</div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{pitchSummary}</p>
            </div>
          </ReportSection>

          {/* Problem Detected */}
          <ReportSection title="Problem Detected" color="var(--color-accent-danger)">
            <DataLine label="Top Gap" value={topGap ? `${topGap.name}: ${topGap.reason}` : planning.topRecommendation.zoneName} />
            <DataLine label="Growth Theme" value={city?.key_planning_challenge ?? `${cityName} infrastructure access and growth planning`} />
            <DataLine label="Scenario" value={`${planning.growthPercent}% growth over ${planning.horizonYears} years · ${planning.timelineYear} target year`} />
          </ReportSection>

          {/* AI Plan */}
          <ReportSection title="AI Plan" color="var(--color-accent-cyan)">
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              {planning.topRecommendation.reason}
            </p>
            <DataLine label="Top Recommendation" value={topItem?.name ?? planning.topRecommendation.title} />
            <DataLine label="Cost" value={`${formatMoney(topCost)} top item · ${formatMoney(totalCost)} full plan`} />
            <DataLine label="Population Served" value={`${topPopulation.toLocaleString()} top item · ${typeof residents === 'number' ? residents.toLocaleString() : residents} full plan`} />

            {activeGaps.length > 0 && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeGaps.map((zone) => (
                  <div key={zone.id} className="rounded-lg p-3" style={{ border: '1px solid rgba(255,90,61,0.2)', background: 'rgba(255,90,61,0.05)' }}>
                    <div className="font-display text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{zone.name}</div>
                    <p style={{ fontSize: 11, marginTop: 2, lineHeight: 1.5, color: 'var(--color-text-muted)' }}>{zone.reason}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(proposed.length ? proposed : planning.aiRecommendations).map((item) => (
                <div key={item.id} className="rounded-lg p-2" style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-hover)' }}>
                  <div className="font-display text-xs" style={{ color: 'var(--color-text-primary)' }}>{item.name}</div>
                  <div className="font-mono" style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>
                    {item.category.replace(/_/g, ' ')} · ${(item.costEstimate / 1_000_000).toFixed(1)}M
                  </div>
                  <div style={{ fontSize: 10, marginTop: 3, color: 'var(--color-text-secondary)' }}>{item.reason}</div>
                </div>
              ))}
            </div>
          </ReportSection>

          {/* Before / After Metrics */}
          <ReportSection title="Before / After Metrics" color="var(--color-accent-green)">
            {before && after ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  ['City Health', before.cityHealth, after.cityHealth],
                  ['Emergency', before.emergencyAccess, after.emergencyAccess],
                  ['Transit', before.transitCoverage, after.transitCoverage],
                  ['Green Space', before.greenSpace, after.greenSpace],
                  ['Education', before.educationAccess, after.educationAccess],
                  ['15-Min City', before.fifteenMinuteCityScore ?? 0, after.fifteenMinuteCityScore ?? 0],
                  ['Avg Commute', before.averageCommute, after.averageCommute],
                  ['Equity', before.equityScore, after.equityScore],
                ].map(([label, b, a]) => {
                  const improved = Number(a) > Number(b)
                  return (
                    <div key={label as string} className="rounded-lg p-3" style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-card)' }}>
                      <div className="font-mono" style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{label}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          {Number(b).toFixed(label === 'Avg Commute' ? 1 : 0)}
                        </span>
                        <TrendingUp size={10} style={{ color: improved ? 'var(--color-accent-green)' : 'var(--color-text-muted)' }} />
                        <span className="font-mono text-sm font-semibold" style={{ color: improved ? 'var(--color-accent-green)' : 'var(--color-text-primary)' }}>
                          {Number(a).toFixed(label === 'Avg Commute' ? 1 : 0)}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Run analysis and apply plan to populate before/after metrics.</p>
            )}
          </ReportSection>

          {/* Cost Estimate & Residents Served */}
          <ReportSection title="Cost Estimate & Residents Served" color="var(--color-accent-cyan)">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 text-center" style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border-subtle)' }}>
                <div className="font-display font-bold text-2xl" style={{ color: 'var(--color-accent-cyan)' }}>{formatMoney(totalCost)}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>Total infrastructure cost</div>
              </div>
              <div className="rounded-xl p-4 text-center" style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border-subtle)' }}>
                <div className="font-display font-bold text-2xl" style={{ color: 'var(--color-accent-green)' }}>
                  {typeof residents === 'number' ? residents.toLocaleString() : residents}
                </div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>Projected residents served</div>
              </div>
            </div>
          </ReportSection>

          {/* Customer Value */}
          <ReportSection title="Customer Value" color="var(--color-accent-purple)">
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              CityPilot AI replaces weeks of manual feasibility study work with AI-generated scenario analysis delivered instantly. Planning teams get an early scenario report before commissioning expensive external studies.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Analysis time', value: 'Under 1 min vs. weeks' },
                { label: 'Study cost', value: '$299/mo vs. $50K+ per study' },
                { label: 'Gap detection', value: 'AI-generated vs. manual GIS' },
                { label: 'Reporting', value: 'Instant vs. weeks' },
              ].map((row) => (
                <div key={row.label} className="rounded-lg p-3" style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border-subtle)' }}>
                  <div className="font-mono uppercase tracking-widest" style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>{row.label}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--color-text-primary)' }}>{row.value}</div>
                </div>
              ))}
            </div>
          </ReportSection>

          {/* Business Use Case */}
          <ReportSection title="Business Use Case" color="var(--color-accent-green)">
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              City planning departments, school districts, transit agencies, and real estate developers use CityPilot AI for early-stage scenario testing before committing to formal environmental review or capital planning studies.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { tier: 'Starter', price: '$299/mo', desc: 'Small city simulations' },
                { tier: 'Team', price: '$999/mo', desc: 'Planning departments', highlight: true },
                { tier: 'Enterprise', price: 'Custom', desc: 'Regional agencies' },
              ].map((p) => (
                <div key={p.tier} className="rounded-lg p-3" style={{ background: p.highlight ? 'rgba(0,212,255,0.07)' : 'var(--color-bg-hover)', border: p.highlight ? '1px solid rgba(0,212,255,0.25)' : '1px solid var(--color-border-subtle)' }}>
                  <div className="font-display font-bold text-sm" style={{ color: p.highlight ? 'var(--color-accent-cyan)' : 'var(--color-text-primary)' }}>{p.price}</div>
                  <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{p.tier} · {p.desc}</div>
                </div>
              ))}
            </div>
          </ReportSection>

          {/* Assumptions */}
          <ReportSection title="Assumptions" color="var(--color-text-muted)">
            <ul className="text-xs space-y-1 list-disc list-inside" style={{ color: 'var(--color-text-secondary)' }}>
              <li>{cityName} geography, landmarks, and growth assumptions are illustrative for demo planning.</li>
              <li>Infrastructure gaps and proposed locations are generated from city bounds and scenario inputs.</li>
              <li>Not a substitute for GIS, CEQA, or formal agency review.</li>
            </ul>
          </ReportSection>

          {/* Next Steps */}
          <ReportSection title="Next Steps" color="var(--color-accent-cyan)">
            <ul className="text-xs space-y-1 list-disc list-inside" style={{ color: 'var(--color-text-secondary)' }}>
              <li>Validate candidate parcels with city GIS data.</li>
              <li>Prioritize {topItem?.name ?? planning.topRecommendation.title} for near-term capital review.</li>
              <li>Use public workshops to confirm equity and access assumptions.</li>
              <li>Commission formal environmental review for approved sites.</li>
            </ul>
          </ReportSection>

        </div>
      </motion.div>
    </motion.div>
  )
}

function ReportSection({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 10, color }}>
        {title}
      </h3>
      {children}
    </section>
  )
}

function DataLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
      <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
      <span style={{ color: 'var(--color-text-secondary)' }}>{value}</span>
    </div>
  )
}

function formatMoney(value?: number) {
  if (!value) return '$0M'
  return `$${Math.round(value / 1_000_000)}M`
}
