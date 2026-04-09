import { useState } from 'react'
import { useQuery, createProject, getProjects } from 'wasp/client/operations'

export default function ProofWorkPage() {
  const { data: projects, isLoading } = useQuery(getProjects)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [clientName, setClientName] = useState('')

  const handleCreate = async () => {
    if (!name || !clientName) return
    await createProject({ name, clientName })
    setName('')
    setClientName('')
    setShowForm(false)
  }

  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='max-w-4xl mx-auto'>

        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold'>Mes projets</h1>
            <p className='text-muted-foreground mt-1'>Gérez vos projets et générez vos rapports clients</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className='bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition'
          >
            + Nouveau projet
          </button>
        </div>

        {/* Formulaire nouveau projet */}
        {showForm && (
          <div className='bg-card border border-border rounded-xl p-6 mb-6'>
            <h2 className='font-semibold text-lg mb-4'>Créer un projet</h2>
            <div className='flex flex-col gap-3'>
              <input
                className='border border-border rounded-lg px-4 py-2 bg-background text-foreground'
                placeholder='Nom du projet (ex: Refonte site web)'
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                className='border border-border rounded-lg px-4 py-2 bg-background text-foreground'
                placeholder='Nom du client (ex: Acme Corp)'
                value={clientName}
                onChange={e => setClientName(e.target.value)}
              />
              <div className='flex gap-2'>
                <button
                  onClick={handleCreate}
                  className='bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition'
                >
                  Créer
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className='border border-border px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition'
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Liste des projets */}
        {isLoading ? (
          <div className='text-muted-foreground'>Chargement...</div>
        ) : projects?.length === 0 ? (
          <div className='text-center py-20 text-muted-foreground'>
            <div className='text-5xl mb-4'>📁</div>
            <p className='text-lg font-medium'>Aucun projet pour l'instant</p>
            <p className='text-sm mt-1'>Créez votre premier projet pour commencer</p>
          </div>
        ) : (
          <div className='grid gap-4'>
            {projects?.map((project: any) => (
              <div key={project.id} className='bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h3 className='font-bold text-lg'>{project.name}</h3>
                    <p className='text-muted-foreground text-sm mt-1'>Client : {project.clientName}</p>
                  </div>
                  <div className='flex gap-2'>
                    <span className='bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium'>
                      {(project as any).activities?.length ?? 0} activités
                    </span>
                  </div>
                </div>
              <div className='mt-4 flex gap-2'>
                <a
                  href={`/report/${project.shareToken}`}
                  target='_blank'
                  className='text-sm border border-border px-3 py-1.5 rounded-lg hover:bg-accent transition'
                >
                  Voir le rapport &#8594;
                </a>
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}