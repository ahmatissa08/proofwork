import { useParams } from 'react-router'
import { useQuery, getReportByToken } from 'wasp/client/operations'

export default function ReportPage() {
  const { token } = useParams<{ token: string }>()
  const { data: project, isLoading, error } = useQuery(getReportByToken, { token: token || '' })

  const activities = (project as any)?.activities || []
  const commits = activities.filter((a: any) => a.source === 'github')
  const tasks = activities.filter((a: any) => a.source === 'linear')
  const meetings = activities.filter((a: any) => a.source === 'calendar')
  const reports = (project as any)?.reports || []
  const latestReport = reports[reports.length - 1]

  const today = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  if (isLoading) return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin'></div>
        <p className='text-gray-400 text-sm'>Chargement du rapport...</p>
      </div>
    </div>
  )

  if (error || !project) return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='text-center'>
        <div className='w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4'>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className='text-gray-400'>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <p className='text-gray-900 font-medium'>Rapport introuvable</p>
        <p className='text-gray-400 text-sm mt-1'>Ce lien est invalide ou a expiré.</p>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-2xl mx-auto px-6 py-12'>

        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 bg-gray-900 rounded flex items-center justify-center'>
                <span className='text-white font-black text-xs'>P</span>
              </div>
              <span className='font-semibold text-gray-900 text-sm'>ProofWork</span>
            </div>
            <span className='text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full font-medium'>
              ✓ Vérifié
            </span>
          </div>
          <h1 className='text-2xl font-semibold text-gray-900 tracking-tight'>
            Rapport — {(project as any).clientName}
          </h1>
          <p className='text-gray-400 text-sm mt-1'>
            {(project as any).name} · Généré le {today}
          </p>
        </div>

        {/* Résumé IA */}
        {latestReport?.summaryAi && (
          <div className='bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm'>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>
              Résumé de la semaine
            </p>
            <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-wrap'>
              {latestReport.summaryAi}
            </p>
          </div>
        )}

        {/* Sections activités */}
        <div className='flex flex-col gap-4'>

          {/* Commits */}
          <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
            <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
              <div className='flex items-center gap-2.5'>
                <div className='w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className='text-gray-600'>
                    <circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                  </svg>
                </div>
                <span className='font-medium text-gray-900 text-sm'>Commits GitHub</span>
              </div>
              <span className='text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full'>
                {commits.length} commit{commits.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className='divide-y divide-gray-50'>
              {commits.length > 0 ? commits.map((c: any) => (
                <div key={c.id} className='px-5 py-3 flex items-start gap-3'>
                  <span className='w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0'></span>
                  <div>
                    <p className='text-sm text-gray-700'>{c.title}</p>
                    {c.description && <p className='text-xs text-gray-400 mt-0.5'>{c.description}</p>}
                  </div>
                </div>
              )) : (
                <div className='px-5 py-4 text-sm text-gray-400'>Aucun commit enregistré</div>
              )}
            </div>
          </div>

          {/* Tâches */}
          <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
            <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
              <div className='flex items-center gap-2.5'>
                <div className='w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className='text-gray-600'>
                    <polyline points="9 11 12 14 22 4"/>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                  </svg>
                </div>
                <span className='font-medium text-gray-900 text-sm'>Tâches complétées</span>
              </div>
              <span className='text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full'>
                {tasks.length} tâche{tasks.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className='divide-y divide-gray-50'>
              {tasks.length > 0 ? tasks.map((t: any) => (
                <div key={t.id} className='px-5 py-3 flex items-center gap-3'>
                  <span className='w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0'></span>
                  <p className='text-sm text-gray-700'>{t.title}</p>
                </div>
              )) : (
                <div className='px-5 py-4 text-sm text-gray-400'>Connectez Linear ou Notion</div>
              )}
            </div>
          </div>

          {/* Réunions */}
          <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
            <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
              <div className='flex items-center gap-2.5'>
                <div className='w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className='text-gray-600'>
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <span className='font-medium text-gray-900 text-sm'>Réunions & décisions</span>
              </div>
              <span className='text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full'>
                {meetings.length} réunion{meetings.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className='divide-y divide-gray-50'>
              {meetings.length > 0 ? meetings.map((m: any) => (
                <div key={m.id} className='px-5 py-3 flex items-center gap-3'>
                  <span className='w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0'></span>
                  <p className='text-sm text-gray-700'>{m.title}</p>
                </div>
              )) : (
                <div className='px-5 py-4 text-sm text-gray-400'>Connectez Google Calendar</div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className='flex items-center justify-between mt-8 pt-6 border-t border-gray-200'>
          <p className='text-xs text-gray-400'>proofwork.app · {token?.slice(0, 8)}...</p>
          <p className='text-xs text-gray-400'>Généré automatiquement par ProofWork</p>
        </div>

      </div>
    </div>
  )
}