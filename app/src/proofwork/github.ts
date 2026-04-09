import { HttpError } from 'wasp/server'

export const githubWebhook = async (req: any, res: any, context: any) => {
  const event = req.headers['x-github-event']
  const payload = req.body

  if (event === 'push') {
    const commits = payload.commits || []
    const repoName = payload.repository?.full_name

    for (const commit of commits) {
      // Trouve le projet lié à ce repo
      const project = await context.entities.Project.findFirst({
        where: { githubRepo: repoName }
      })

      if (project) {
        await context.entities.Activity.create({
          data: {
            projectId: project.id,
            source: 'github',
            type: 'commit',
            title: commit.message,
            description: `Par ${commit.author?.name}`,
            url: commit.url,
            happenedAt: new Date(commit.timestamp),
          }
        })
      }
    }
  }

  res.json({ received: true })
}