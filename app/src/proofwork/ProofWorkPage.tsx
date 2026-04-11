import { useState } from 'react'
import { useQuery, createProject, getProjects, generateReport, updateProject, deleteProject, getDashboardStats } from 'wasp/client/operations'
const WEBHOOK_URL = 'https://proofwork-app-server.fly.dev/github-webhook'

type Toast = { id: number; message: string; type: 'success' | 'error' }

export default function ProofWorkPage() {
const { data: stats } = useQuery(getDashboardStats)  
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [clientName, setClientName] = useState('')
  const [githubRepo, setGithubRepo] = useState('')
  const [generating, setGenerating] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showGuide, setShowGuide] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editClientName, setEditClientName] = useState('')
  const [editGithubRepo, setEditGithubRepo] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  const handleCreate = async () => {
    if (!name || !clientName) return
    let cleanRepo = githubRepo
    if (githubRepo.includes('github.com/')) {
      cleanRepo = githubRepo.split('github.com/')[1].replace('.git', '').trim()
    }
    await createProject({ name, clientName, githubRepo: cleanRepo })
    setName(''); setClientName(''); setGithubRepo('')
    setShowForm(false)
    addToast('Projet créé avec succès !')
  }

  const handleGenerate = async (projectId: string) => {
    setGenerating(projectId)
    try {
      await generateReport({ projectId })
      addToast('Résumé IA généré avec succès !')
    } catch (e) {
      addToast('Erreur lors de la génération', 'error')
    }
    setGenerating(null)
  }

  const handleEdit = (project: any) => {
    setEditingId(project.id)
    setEditName(project.name)
    setEditClientName(project.clientName)
    setEditGithubRepo(project.githubRepo || '')
  }

  const handleUpdate = async () => {
    if (!editingId || !editName || !editClientName) return
    let cleanRepo = editGithubRepo
    if (editGithubRepo.includes('github.com/')) {
      cleanRepo = editGithubRepo.split('github.com/')[1].replace('.git', '').trim()
    }
    await updateProject({ id: editingId, name: editName, clientName: editClientName, githubRepo: cleanRepo })
    setEditingId(null)
    addToast('Projet mis à jour !')
  }

  const handleDelete = async (id: string) => {
    await deleteProject({ id })
    setConfirmDeleteId(null)
    addToast('Projet supprimé')
  }

  const copyWebhook = (id: string) => {
    navigator.clipboard.writeText(WEBHOOK_URL)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const copyReportLink = (token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/report/${token}`)
    addToast('Lien copié dans le presse-papiers !')
  }

  return (
    <div className='min-h-screen bg-gray-50'>

      {/* Toasts */}
      <div className='fixed top-4 right-4 z-50 flex flex-col gap-2'>
        {toasts.map(t => (
          <div key={t.id} className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
            t.type === 'success'
              ? 'bg-gray-900 text-white'
              : 'bg-red-500 text-white'
          }`}>
            <span>{t.type === 'success' ? '✓' : '✕'}</span>
            {t.message}
          </div>
        ))}
      </div>

      <div className='max-w-3xl mx-auto px-6 py-12'>

        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-2xl font-semibold text-gray-900 tracking-tight'>Projets</h1>
            <p className='text-gray-500 text-sm mt-1'>Vos projets et rapports clients</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className='flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition'
          >
            <span>+</span> Nouveau projet
          </button>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-3 gap-3 mb-8'>
          {[
            { label: 'Projets', value: stats?.totalProjects ?? 0, icon: '📁' },
            { label: 'Activités', value: stats?.totalActivities ?? 0, icon: '⚡' },
            { label: 'Rapports', value: stats?.totalReports ?? 0, icon: '📄' },
          ].map(stat => (
            <div key={stat.label} className='bg-white border border-gray-200 rounded-xl p-4 shadow-sm'>
              <div className='flex items-center gap-2 mb-1'>
                <span className='text-base'>{stat.icon}</span>
                <span className='text-xs text-gray-400 font-medium uppercase tracking-wide'>{stat.label}</span>
              </div>
              <p className='text-2xl font-semibold text-gray-900'>{stat.value}</p>
            </div>
          ))}
        </div>
        {/* Formulaire création */}
        {showForm && (
          <div className='bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm'>
            <h2 className='font-semibold text-gray-900 mb-1'>Nouveau projet</h2>
            <p className='text-gray-400 text-sm mb-5'>Remplissez les informations et connectez votre repo GitHub.</p>
            <div className='flex flex-col gap-4'>
              <div>
                <label className='text-xs text-gray-500 font-medium uppercase tracking-wide mb-1 block'>Nom du projet *</label>
                <input className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition'
                  placeholder='ex: Refonte site web' value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className='text-xs text-gray-500 font-medium uppercase tracking-wide mb-1 block'>Nom du client *</label>
                <input className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition'
                  placeholder='ex: Acme Corp' value={clientName} onChange={e => setClientName(e.target.value)} />
              </div>
              <div>
                <label className='text-xs text-gray-500 font-medium uppercase tracking-wide mb-1 block'>Repo GitHub</label>
                <input className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition font-mono'
                  placeholder='ex: username/mon-projet' value={githubRepo} onChange={e => setGithubRepo(e.target.value)} />
                <p className='text-xs text-gray-400 mt-1'>Format : <span className='font-mono'>username/nom-du-repo</span></p>
              </div>
              {githubRepo && (
                <div className='bg-blue-50 border border-blue-100 rounded-xl p-4'>
                  <p className='text-sm font-semibold text-blue-900 mb-3'>📋 Connecter GitHub en 3 étapes</p>
                  <ol className='flex flex-col gap-2.5'>
                    <li className='flex items-start gap-3'>
                      <span className='w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold'>1</span>
                      <div>
                        <p className='text-sm text-blue-900 font-medium'>Ouvrez les paramètres de votre repo</p>
                        <a href={`https://github.com/${githubRepo}/settings/hooks/new`} target='_blank' className='text-xs text-blue-600 hover:underline font-mono'>
                          github.com/{githubRepo}/settings/hooks/new ↗
                        </a>
                      </div>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold'>2</span>
                      <div className='flex-1'>
                        <p className='text-sm text-blue-900 font-medium'>Collez cette URL dans "Payload URL"</p>
                        <div className='flex items-center gap-2 mt-1.5 bg-white border border-blue-200 rounded-lg px-3 py-2'>
                          <code className='text-xs text-gray-700 flex-1 font-mono truncate'>{WEBHOOK_URL}</code>
                          <button onClick={() => { navigator.clipboard.writeText(WEBHOOK_URL); addToast('URL copiée !') }}
                            className='text-xs text-blue-600 hover:text-blue-800 font-medium flex-shrink-0'>Copier</button>
                        </div>
                      </div>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold'>3</span>
                      <div>
                        <p className='text-sm text-blue-900 font-medium'>Sélectionnez "application/json" → "Add webhook"</p>
                        <p className='text-xs text-blue-500 mt-0.5'>Chaque push sera automatiquement enregistré.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              )}
              <div className='flex gap-2 pt-1'>
                <button onClick={handleCreate} className='bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition'>Créer le projet</button>
                <button onClick={() => setShowForm(false)} className='border border-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm hover:text-gray-900 transition'>Annuler</button>
              </div>
            </div>
          </div>
        )}

        {/* Liste projets */}
        {isLoading ? (
          <div className='text-gray-400 text-sm'>Chargement...</div>
        ) : projects?.length === 0 ? (
          <div className='text-center py-24 bg-white border border-gray-200 rounded-xl'>
            <div className='w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4'>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className='text-gray-400'>
                <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
              </svg>
            </div>
            <p className='text-gray-900 font-medium'>Aucun projet</p>
            <p className='text-gray-400 text-sm mt-1'>Créez votre premier projet pour commencer</p>
            <button onClick={() => setShowForm(true)} className='mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition'>
              + Nouveau projet
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            {projects?.map((project: any) => (
              <div key={project.id} className='bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition shadow-sm'>

                {/* Mode édition */}
                {editingId === project.id ? (
                  <div className='flex flex-col gap-3'>
                    <h3 className='font-semibold text-gray-900 text-sm mb-1'>Modifier le projet</h3>
                    <div>
                      <label className='text-xs text-gray-400 uppercase tracking-wide mb-1 block'>Nom du projet</label>
                      <input className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition'
                        value={editName} onChange={e => setEditName(e.target.value)} />
                    </div>
                    <div>
                      <label className='text-xs text-gray-400 uppercase tracking-wide mb-1 block'>Nom du client</label>
                      <input className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition'
                        value={editClientName} onChange={e => setEditClientName(e.target.value)} />
                    </div>
                    <div>
                      <label className='text-xs text-gray-400 uppercase tracking-wide mb-1 block'>Repo GitHub</label>
                      <input className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 transition'
                        value={editGithubRepo} onChange={e => setEditGithubRepo(e.target.value)} />
                    </div>
                    <div className='flex gap-2'>
                      <button onClick={handleUpdate} className='bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition'>Enregistrer</button>
                      <button onClick={() => setEditingId(null)} className='border border-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm hover:text-gray-900 transition'>Annuler</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header projet */}
                    <div className='flex items-start justify-between mb-4'>
                      <div>
                        <h3 className='font-semibold text-gray-900'>{project.name}</h3>
                        <p className='text-gray-400 text-sm mt-0.5'>{project.clientName}</p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full'>
                          {project.activities?.length ?? 0} activités
                        </span>
                        {project.reports?.length > 0 && (
                          <span className='text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full'>
                            Rapport disponible
                          </span>
                        )}
                        {/* Menu modifier/supprimer */}
                        <button onClick={() => handleEdit(project)}
                          className='text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition' title='Modifier'>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button onClick={() => setConfirmDeleteId(project.id)}
                          className='text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition' title='Supprimer'>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Confirmation suppression */}
                    {confirmDeleteId === project.id && (
                      <div className='mb-4 bg-red-50 border border-red-100 rounded-lg p-3 flex items-center justify-between'>
                        <p className='text-sm text-red-700'>Supprimer ce projet et toutes ses données ?</p>
                        <div className='flex gap-2'>
                          <button onClick={() => handleDelete(project.id)}
                            className='bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-600 transition'>
                            Supprimer
                          </button>
                          <button onClick={() => setConfirmDeleteId(null)}
                            className='border border-red-200 text-red-500 px-3 py-1.5 rounded-lg text-xs hover:bg-red-100 transition'>
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Activités récentes */}
                    {project.activities?.length > 0 && (
                      <div className='mb-4 bg-gray-50 rounded-lg p-3'>
                        <p className='text-xs text-gray-400 font-medium uppercase tracking-wide mb-2'>Dernières activités</p>
                        {project.activities.slice(0, 3).map((a: any) => (
                          <div key={a.id} className='flex items-center gap-2 text-xs text-gray-600 py-0.5'>
                            <span className='w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0'></span>
                            <span className='truncate'>{a.title}</span>
                            <span className='text-gray-300 ml-auto flex-shrink-0'>{a.source}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Guide webhook */}
                    {project.githubRepo && (
                      <div className='mb-4'>
                        <button onClick={() => setShowGuide(showGuide === project.id ? null : project.id)}
                          className='flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition'>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                          </svg>
                          Repo : <span className='font-mono'>{project.githubRepo}</span>
                          <span className='ml-1'>{showGuide === project.id ? '▲' : '▼'}</span>
                        </button>
                        {showGuide === project.id && (
                          <div className='mt-3 bg-gray-50 border border-gray-200 rounded-xl p-4'>
                            <p className='text-xs font-semibold text-gray-700 mb-3'>🔗 Guide webhook GitHub</p>
                            <ol className='flex flex-col gap-2'>
                              <li className='flex items-start gap-2 text-xs text-gray-600'>
                                <span className='w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 font-bold'>1</span>
                                <span>Allez sur <a href={`https://github.com/${project.githubRepo}/settings/hooks/new`} target='_blank' className='text-blue-500 hover:underline font-mono'>github.com/{project.githubRepo}/settings/hooks/new ↗</a></span>
                              </li>
                              <li className='flex items-start gap-2 text-xs text-gray-600'>
                                <span className='w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 font-bold'>2</span>
                                <div className='flex-1'>
                                  <span>Collez cette URL dans "Payload URL" :</span>
                                  <div className='flex items-center gap-2 mt-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5'>
                                    <code className='text-xs text-gray-700 flex-1 font-mono truncate'>{WEBHOOK_URL}</code>
                                    <button onClick={() => copyWebhook(project.id)} className='text-xs text-blue-500 hover:text-blue-700 font-medium flex-shrink-0'>
                                      {copiedId === project.id ? '✓ Copié' : 'Copier'}
                                    </button>
                                  </div>
                                </div>
                              </li>
                              <li className='flex items-start gap-2 text-xs text-gray-600'>
                                <span className='w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 font-bold'>3</span>
                                <span>Choisissez <strong>application/json</strong> → <strong>Add webhook</strong></span>
                              </li>
                            </ol>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className='flex gap-2'>
                      <a href={`/report/${project.shareToken}`} target='_blank'
                        className='flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition'>
                        Voir le rapport
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                      </a>
                      <button onClick={() => handleGenerate(project.id)} disabled={generating === project.id}
                        className='flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition disabled:opacity-50'>
                        {generating === project.id ? (
                          <><span className='w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin'></span>Génération...</>
                        ) : <>✦ Résumé IA</>}
                      </button>
                      <button onClick={() => copyReportLink(project.shareToken)}
                        className='flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition ml-auto'>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                        </svg>
                        Copier le lien
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}