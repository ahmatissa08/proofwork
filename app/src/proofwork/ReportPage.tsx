import { useParams } from 'react-router'
import { useQuery } from 'wasp/client/operations'
import { getProjects } from 'wasp/client/operations'

export default function ReportPage() {
  const { token } = useParams<{ token: string }>()

  return (
    <div className='min-h-screen bg-[#0a0a0a] text-white p-8'>
      <div className='max-w-2xl mx-auto'>

        {/* Header */}
        <div className='border border-[#222] rounded-xl overflow-hidden'>
          <div className='flex items-center justify-between p-5 border-b border-[#222]'>
            <div>
              <div className='font-bold text-lg'>Rapport de projet</div>
              <div className='text-xs text-gray-500 font-mono mt-0.5'>
                Généré automatiquement par ProofWork
              </div>
            </div>
            <div className='bg-[#c8f135]/10 border border-[#c8f135]/30 text-[#c8f135] text-xs px-3 py-1 rounded font-mono'>
              VÉRIFIÉ
            </div>
          </div>

          {/* Activités exemple */}
          <div className='p-5 flex flex-col gap-5'>

            <div className='flex gap-3'>
              <div className='w-8 h-8 bg-[#1a1a1a] border border-[#222] rounded flex items-center justify-center text-sm flex-shrink-0'>
                ⌥
              </div>
              <div>
                <div className='font-semibold text-sm'>Commits GitHub</div>
                <div className='text-xs text-gray-500 mt-1 font-mono'>
                  Connectez GitHub pour voir vos commits ici
                </div>
                <div className='text-xs text-gray-600 mt-1 font-mono'>Source: GitHub</div>
              </div>
            </div>

            <div className='flex gap-3'>
              <div className='w-8 h-8 bg-[#1a1a1a] border border-[#222] rounded flex items-center justify-center text-sm flex-shrink-0'>
                ◈
              </div>
              <div>
                <div className='font-semibold text-sm'>Tâches complétées</div>
                <div className='text-xs text-gray-500 mt-1 font-mono'>
                  Connectez Linear ou Notion pour voir vos tâches
                </div>
                <div className='text-xs text-gray-600 mt-1 font-mono'>Source: Linear</div>
              </div>
            </div>

            <div className='flex gap-3'>
              <div className='w-8 h-8 bg-[#1a1a1a] border border-[#222] rounded flex items-center justify-center text-sm flex-shrink-0'>
                ◎
              </div>
              <div>
                <div className='font-semibold text-sm'>Réunions & décisions</div>
                <div className='text-xs text-gray-500 mt-1 font-mono'>
                  Connectez Google Calendar pour voir vos réunions
                </div>
                <div className='text-xs text-gray-600 mt-1 font-mono'>Source: Google Calendar</div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className='flex items-center justify-between p-4 border-t border-[#222] bg-[#c8f135]/[0.02]'>
            <div className='font-mono text-xs text-gray-600'>
              proofwork.app/report/{token?.slice(0, 8)}...
            </div>
            <div className='font-mono text-xs text-gray-700'>
              hash: {token?.slice(0, 8)}
            </div>
          </div>
        </div>

        {/* Powered by */}
        <div className='text-center mt-6 text-xs text-gray-700 font-mono'>
          Powered by ProofWork — proofwork.app
        </div>

      </div>
    </div>
  )
}