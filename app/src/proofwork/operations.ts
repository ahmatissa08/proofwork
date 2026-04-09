import { HttpError } from 'wasp/server'

export const getProjects = async (_args: void, context: any) => {
  if (!context.user) throw new HttpError(401)
  return context.entities.Project.findMany({
    where: { userId: context.user.id },
    include: { activities: true, reports: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const createProject = async (
  { name, clientName }: { name: string; clientName: string },
  context: any
) => {
  if (!context.user) throw new HttpError(401)
  return context.entities.Project.create({
    data: { name, clientName, userId: context.user.id },
  })
}

export const createActivity = async (
  { projectId, source, type, title, description, url }: {
    projectId: string; source: string; type: string
    title: string; description?: string; url?: string
  },
  context: any
) => {
  if (!context.user) throw new HttpError(401)
  return context.entities.Activity.create({
    data: { projectId, source, type, title, description, url },
  })
}

export const getActivitiesByProject = async (
  { projectId }: { projectId: string },
  context: any
) => {
  if (!context.user) throw new HttpError(401)
  return context.entities.Activity.findMany({
    where: { projectId },
    orderBy: { happenedAt: 'desc' },
  })
}