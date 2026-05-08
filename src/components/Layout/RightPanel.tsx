import { FileText, Search, Sparkles, TrendingUp } from 'lucide-react'
import { useCityStore } from '@/stores/cityStore'
import { useScenarioStore } from '@/stores/scenarioStore'
import { useSimulationStore } from '@/stores/simulationStore'

export function RightPanel() {
  const selectedCity = useCityStore((state) => state.selectedCity)
  const activeScenario = useScenarioStore((state) => state.activeScenario)
  const { planning, analyzeDemo, applyAIPlan, openReport } = useSimulationStore()
  const topRecommendation = planning.topRecommendation
  const topItem = planning.aiRecommendations.find((item) => topRecommendation.itemIds?.includes(item.id)) ?? planning.aiRecommendations[0]
  const before = planning.beforeScores
  const afterPreview = previewAfterMetrics(planning)
  const populationServed = topRecommendation.expectedImpact.populationServed ?? Math.round((selectedCity?.population_current ?? planning.timelinePopulation) * 0.018)

  const topGap = planning.underservedZones[0]
  const topGapName = topGap?.name ?? topRecommendation.zoneName ?? 'South Emergency Gap'

  return (
    <aside
      className="w-[300px] shrink-0 overflow-y-auto"
      style={{
        background: 'var(--color-bg-sidebar)',
        borderLeft: '1px solid var(--color-border-subtle)',
        boxShadow: '-16px 0 46px rgba(0,0,0,0.18)',
      }}
    >
      <div className="space-y-3 p-3">

        {/* Product label */}
        <div className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}>
          <Sparkles size={12} style={{ color: 'var(--color-accent-cyan)' }} />
          <span className="font-mono uppercase tracking-widest" style={{ fontSize: 9, color: 'var(--color-accent-cyan)' }}>
            CityPilot AI Copilot
          </span>
        </div>

        {!planning.hasAnalyzed ? (
          <section className="rounded-lg p-4" style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border-subtle)' }}>
            <h2 className="font-display text-base font-semibold leading-tight mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Ready to analyze infrastructure gaps
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>
              CityPilot AI will scan this city's growth scenario, identify underserved districts, and rank infrastructure investments by equity and cost.
            </p>
            <button
              type="button"
              onClick={() => selectedCity && analyzeDemo(selectedCity.id, activeScenario)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold"
              style={{ background: 'var(--color-bg-panel)', color: 'var(--color-accent-cyan)', border: '1px solid rgba(0,212,255,0.35)' }}
            >
              <Search size={15} />
              Analyze Infrastructure Gaps
            </button>
          </section>
        ) : (
          <section className="rounded-lg p-4" style={{ background: 'var(--color-bg-hover)', border: '1px solid rgba(255,71,87,0.3)' }}>
            <div className="flex items-center gap-2 font-mono uppercase tracking-widest mb-2" style={{ fontSize: 9, color: 'var(--color-accent-cyan)' }}>
              <Sparkles size={12} />
              Top Problem Detected
            </div>
            {!planning.hasAppliedAIPlan ? (
              <>
                <h2 className="font-display text-base font-semibold leading-tight mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {topGapName} lacks adequate coverage
                </h2>
                <p className="leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>
                  <strong>Recommendation:</strong> Add{' '}
                  {topItem?.name ?? topRecommendation.title.replace(/^Add\s+/i, '')}.{' '}
                  {topRecommendation.reason}
                </p>

                {/* Business value callout */}
                <div className="rounded-lg px-3 py-2 mb-3" style={{ background: 'rgba(0,184,148,0.07)', border: '1px solid rgba(0,184,148,0.2)' }}>
                  <div className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 9, color: 'var(--color-accent-green)' }}>
                    Business value
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 11, lineHeight: 1.5 }}>
                    This gives planning teams an early scenario report before commissioning expensive external studies.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <Impact label="Emergency Access" value={metricRange(before?.emergencyAccess, afterPreview.emergencyAccess)} />
                  <Impact label="City Health" value={metricRange(before?.cityHealth, afterPreview.cityHealth)} />
                  <Impact label="Equity Score" value={metricRange(before?.equityScore, afterPreview.equityScore)} />
                  <Impact label="Commute" value={`${before?.averageCommute ?? '—'} → ${afterPreview.averageCommute} min`} />
                  <Impact label="Cost Estimate" value={formatMoney(topItem?.costEstimate ?? topRecommendation.costEstimate ?? topRecommendation.estimatedCost)} />
                  <Impact label="Residents Served" value={populationServed.toLocaleString()} />
                </div>

                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => applyAIPlan(activeScenario)}
                    className="rounded-lg px-3 py-3 text-sm font-semibold"
                    style={{ background: 'rgba(0,184,148,0.09)', color: 'var(--color-accent-green)', border: '1px solid rgba(0,184,148,0.38)' }}
                  >
                    Apply Recommendation
                  </button>
                  <button
                    type="button"
                    onClick={() => applyAIPlan(activeScenario)}
                    className="rounded-lg px-3 py-3 text-sm font-semibold"
                    style={{ background: 'var(--color-bg-panel)', color: 'var(--color-accent-cyan)', border: '1px solid rgba(0,212,255,0.35)' }}
                  >
                    Apply Full AI Plan
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display text-base font-semibold" style={{ color: 'var(--color-accent-green)' }}>
                  AI Plan Applied
                </h2>
                <p className="mt-1 mb-3" style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>
                  Infrastructure improvements applied. Generate a planning report to document before/after impact.
                </p>
                <button
                  type="button"
                  onClick={openReport}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold"
                  style={{ background: 'var(--color-bg-panel)', color: 'var(--color-accent-purple)', border: '1px solid var(--color-border-subtle)' }}
                >
                  <FileText size={15} />
                  Generate Planning Report
                </button>
              </>
            )}
          </section>
        )}

        {/* Impact Summary after plan applied */}
        {planning.hasAppliedAIPlan && (
          <section className="rounded-lg p-4" style={{ background: 'rgba(0,184,148,0.08)', border: '1px solid rgba(0,184,148,0.32)' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} style={{ color: 'var(--color-accent-green)' }} />
              <div className="font-display text-sm font-semibold" style={{ color: 'var(--color-accent-green)' }}>
                Before / After Impact
              </div>
            </div>
            <ImpactSummary />
          </section>
        )}

        {/* Placement feedback */}
        {planning.placementFeedback && (
          <section className="rounded-lg p-3" style={{
            background: planning.placementFeedback.type === 'invalid' ? 'rgba(225,112,85,0.09)' : planning.placementFeedback.type === 'good' ? 'rgba(0,184,148,0.08)' : 'rgba(108,92,231,0.08)',
            border: planning.placementFeedback.type === 'invalid' ? '1px solid rgba(225,112,85,0.34)' : planning.placementFeedback.type === 'good' ? '1px solid rgba(0,184,148,0.34)' : '1px solid rgba(108,92,231,0.34)',
          }}>
            <div className="text-sm font-semibold" style={{ color: planning.placementFeedback.type === 'good' ? 'var(--color-accent-green)' : 'var(--color-accent-danger)' }}>
              {planning.placementFeedback.title}
            </div>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {planning.placementFeedback.message}
            </p>
          </section>
        )}

        {/* Detailed Metrics */}
        {planning.beforeScores && (
          <details>
            <summary className="cursor-pointer font-mono uppercase tracking-widest" style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>
              Detailed Metrics
            </summary>
            <div className="mt-2 grid gap-2">
              <Metric label="City Health" before={planning.beforeScores.cityHealth} after={planning.afterScores?.cityHealth} />
              <Metric label="Emergency Access" before={planning.beforeScores.emergencyAccess} after={planning.afterScores?.emergencyAccess} />
              <Metric label="Transit Coverage" before={planning.beforeScores.transitCoverage} after={planning.afterScores?.transitCoverage} />
              <Metric label="Green Space" before={planning.beforeScores.greenSpace} after={planning.afterScores?.greenSpace} />
              <Metric label="Equity Score" before={planning.beforeScores.equityScore} after={planning.afterScores?.equityScore} />
              <Metric label="15-Min City" before={planning.beforeScores.fifteenMinuteCityScore ?? 54} after={planning.afterScores?.fifteenMinuteCityScore} />
              <Metric label="Avg Commute" before={planning.beforeScores.averageCommute} after={planning.afterScores?.averageCommute} inverse />
            </div>
          </details>
        )}

        {/* Service Gaps */}
        <details>
          <summary className="cursor-pointer font-mono uppercase tracking-widest" style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>
            Service Gaps
          </summary>
          {planning.hasAnalyzed ? (
            <div className="mt-2 grid gap-2">
              {planning.underservedZones.map((gap) => (
                <div key={gap.id} className="rounded-lg p-3" style={{
                  background: gap.isImproved ? 'rgba(0,184,148,0.08)' : 'rgba(225,112,85,0.08)',
                  border: gap.isImproved ? '1px solid rgba(0,184,148,0.25)' : '1px solid rgba(225,112,85,0.25)',
                }}>
                  <div className="flex justify-between gap-2">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{gap.name}</span>
                    <span className="font-mono" style={{ fontSize: 10, color: gap.isImproved ? 'var(--color-accent-green)' : 'var(--color-accent-danger)' }}>
                      {gap.isImproved ? 'Resolved' : 'Gap'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{gap.reason}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>Run analysis to reveal underserved zones.</p>
          )}
        </details>
      </div>
    </aside>
  )
}

function ImpactSummary() {
  const planning = useSimulationStore((s) => s.planning)
  const summary = planning.impactSummary
  const before = planning.beforeScores
  const after = planning.afterScores ?? before
  const residents = summary?.residentsServed ?? after?.populationServed ?? 0
  const gaps = summary?.gapsFixed ?? planning.underservedZones.filter((zone) => zone.isImproved).length
  const cityHealth = summary?.cityHealthDelta ?? delta(after?.cityHealth, before?.cityHealth)
  const emergency = summary?.emergencyDelta ?? delta(after?.emergencyAccess, before?.emergencyAccess)
  const equity = summary?.equityDelta ?? delta(after?.equityScore, before?.equityScore)
  const fifteen = summary?.fifteenMinuteDelta ?? delta(after?.fifteenMinuteCityScore, before?.fifteenMinuteCityScore)
  const cost = summary?.budgetUsed ?? after?.totalEstimatedCost ?? planning.infrastructure.filter((item) => item.status === 'proposed').reduce((sum, item) => sum + item.costEstimate, 0)
  return (
    <div className="grid grid-cols-2 gap-2">
      <Impact label="Residents Served" value={residents.toLocaleString()} />
      <Impact label="Gaps Resolved" value={String(gaps)} />
      <Impact label="City Health ↑" value={formatDelta(cityHealth)} />
      <Impact label="Emergency ↑" value={formatDelta(emergency)} />
      <Impact label="Equity ↑" value={formatDelta(equity)} />
      <Impact label="15-Min City ↑" value={formatDelta(fifteen)} />
      <Impact label="Total Cost" value={formatMoney(cost)} />
    </div>
  )
}

function Impact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.32)', border: '1px solid var(--color-border-subtle)' }}>
      <div className="font-mono uppercase tracking-wide" style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>{label}</div>
      <div className="mt-0.5 font-mono text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{value}</div>
    </div>
  )
}

function Metric({ label, before, after, inverse = false }: { label: string; before: number; after?: number; inverse?: boolean }) {
  const currentAfter = after ?? before
  const d = Math.round((currentAfter - before) * 10) / 10
  const improved = inverse ? d < 0 : d > 0
  return (
    <div className="rounded-lg p-3" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)' }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
        <span className="font-mono" style={{ fontSize: 11, color: Math.abs(d) < 0.1 ? 'var(--color-text-muted)' : improved ? 'var(--color-accent-green)' : 'var(--color-accent-danger)' }}>
          {d > 0 ? '+' : ''}{d}
        </span>
      </div>
      <div className="mt-1 font-mono text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
        {before} <span style={{ color: 'var(--color-text-muted)' }}>→</span> {currentAfter}
      </div>
    </div>
  )
}

function previewAfterMetrics(planning: ReturnType<typeof useSimulationStore.getState>['planning']) {
  const before = planning.beforeScores
  const impact = planning.topRecommendation.expectedImpact
  return {
    emergencyAccess: clampMetric((before?.emergencyAccess ?? 0) + (impact.emergencyAccess ?? 8)),
    cityHealth: clampMetric((before?.cityHealth ?? 0) + (impact.cityHealth ?? 8)),
    equityScore: clampMetric((before?.equityScore ?? 0) + (impact.equityScore ?? 6)),
    averageCommute: Math.max(12, Math.round((before?.averageCommute ?? 42) + (impact.averageResponseTime ?? -3))),
  }
}

function clampMetric(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function metricRange(before?: number, after?: number) {
  return `${before ?? '—'} → ${after ?? '—'}`
}

function delta(after?: number, before?: number) {
  if (typeof after !== 'number' || typeof before !== 'number') return 0
  return Math.round(after - before)
}

function formatDelta(value: number) {
  return `${value > 0 ? '+' : ''}${value}`
}

function formatMoney(value?: number) {
  if (!value) return '$0M'
  return `$${Math.round(value / 1_000_000)}M`
}
