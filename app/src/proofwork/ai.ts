import { HttpError } from 'wasp/server'

export const generateReport = async (
  { projectId }: { projectId: string },
  context: any
) => {
  if (!context.user) throw new HttpError(401)

  const project = await context.entities.Project.findFirst({
    where: { id: projectId, userId: context.user.id },
    include: { activities: true }
  })

  if (!project) throw new HttpError(404)

  const activities = project.activities
  const commits = activities.filter((a: any) => a.source === 'github')
  const tasks = activities.filter((a: any) => a.source === 'linear')
  const meetings = activities.filter((a: any) => a.source === 'calendar')

  const prompt = `Tu es un assistant qui génère des rapports professionnels pour des clients.

Voici les activités de la semaine pour le projet "${project.name}" (client: ${project.clientName}) :

COMMITS GITHUB (${commits.length}) :
${commits.map((c: any) => `- ${c.title} (${c.description || ''})`).join('\n') || 'Aucun commit'}

TÂCHES COMPLÉTÉES (${tasks.length}) :
${tasks.map((t: any) => `- ${t.title}`).join('\n') || 'Aucune tâche'}

RÉUNIONS & DÉCISIONS (${meetings.length}) :
${meetings.map((m: any) => `- ${m.title}`).join('\n') || 'Aucune réunion'}

Génère un rapport client professionnel en 3 paragraphes courts :
1. Ce qui a été accompli cette semaine
2. Les décisions importantes prises
3. Les prochaines étapes

Ton professionnel et factuel. Maximum 150 mots.`

  const response = await fetch(
`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  )

  const data = await response.json() as any
  console.log('Gemini response:', JSON.stringify(data, null, 2))
  const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Erreur de génération'

  await context.entities.Report.create({
    data: {
      projectId: project.id,
      weekStart: new Date(),
      weekEnd: new Date(),
      summaryAi: summary,
    }
  })

  return summary
}