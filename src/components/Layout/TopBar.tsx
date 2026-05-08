import { useState } from 'react'
import { FileText, Search, Presentation } from 'lucide-react'
import { useCityStore } from '@/stores/cityStore'
import { useScenarioStore } from '@/stores/scenarioStore'
import { useSimulationStore } from '@/stores/simulationStore'
import { useNotification } from '@/hooks/useNotification'
import { Logo } from '@/components/UI/LandingScreen'
import { PitchModeModal } from '@/components/UI/PitchModeModal'

export function TopBar({ onHome }: { onHome: () => void }) {
  const [pitchOpen, setPitchOpen] = useState(false)
  const selectedCity = useCityStore((state) => state.selectedCity)
  const activeScenario = useScenarioStore((state) => state.activeScenario)
  const { planning, analyzeDemo, openReport } = useSimulationStore()
  const notify = useNotification((state) => state.notify)

  const handleAnalyze = () => {
    if (!selectedCity) {
      notify('warning', 'Choose a city before running infrastructure analysis.', 2400)
      return
    }
    analyzeDemo(selectedCity.id, activeScenario)
    notify('success', 'Infrastructure gaps detected for the selected city.', 2400)
  }

  return (
    <>
      <header
        className="flex h-14 shrink-0 items-center gap-3 px-4"
        style={{
          background: 'var(--color-bg-sidebar)',
          borderBottom: '1px solid var(--color-border-subtle)',
          boxShadow: '0 2px 14px rgba(0,0,0,0.18)',
        }}
      >
        {/* Logo */}
        <button
          onClick={onHome}
          className="rounded-lg px-1 py-1 shrink-0"
          style={{ border: '1px solid transparent', background: 'transparent' }}
          aria-label="CityPilot AI home"
        >
          <Logo />
        </button>

        <div className="h-7 w-px shrink-0" style={{ background: 'var(--color-border-subtle)' }} />

        {/* City label */}
        <div className="min-w-0 hidden sm:block">
          <div className="font-mono uppercase tracking-widest" style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>
            City
          </div>
          <div className="truncate text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {selectedCity?.name ?? 'No city selected'}
          </div>
        </div>

        <span
          className="hidden rounded-full px-2 py-0.5 font-mono uppercase tracking-wider md:inline-flex shrink-0"
          style={{
            fontSize: 10,
            color: 'var(--color-accent-green)',
            border: '1px solid rgba(0,184,148,0.28)',
            background: 'rgba(0,184,148,0.07)',
          }}
        >
          Demo Ready
        </span>

        <div className="flex-1" />

        {/* Analyze */}
        <button
          onClick={handleAnalyze}
          disabled={!selectedCity}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-45 shrink-0"
          style={{
            color: 'var(--color-accent-cyan)',
            border: '1px solid rgba(0,212,255,0.35)',
            background: 'var(--color-bg-hover)',
          }}
        >
          <Search size={14} />
          <span className="hidden sm:inline">{planning.hasAnalyzed ? 'Reanalyze' : 'Analyze Infrastructure Gaps'}</span>
          <span className="sm:hidden">Analyze</span>
        </button>

        {/* Generate Report */}
        <button
          onClick={openReport}
          disabled={!planning.hasAnalyzed}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 shrink-0"
          style={{
            color: planning.hasAnalyzed ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
            border: '1px solid var(--color-border-subtle)',
            background: 'var(--color-bg-panel)',
          }}
        >
          <FileText size={14} />
          <span className="hidden sm:inline">Generate Report</span>
        </button>

        {/* Pitch Mode */}
        <button
          onClick={() => setPitchOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold shrink-0"
          style={{
            color: '#fff',
            border: '1px solid rgba(108,92,231,0.5)',
            background: 'linear-gradient(135deg, rgba(108,92,231,0.85), rgba(0,212,255,0.5))',
            boxShadow: '0 2px 8px rgba(108,92,231,0.3)',
          }}
        >
          <Presentation size={14} />
          <span className="hidden sm:inline">Pitch Mode</span>
        </button>
      </header>

      <PitchModeModal isOpen={pitchOpen} onClose={() => setPitchOpen(false)} />
    </>
  )
}
