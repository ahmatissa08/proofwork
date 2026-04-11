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
  { name, clientName, githubRepo }: { name: string; clientName: string; githubRepo?: string },
  context: any
) => {
  if (!context.user) throw new HttpError(401)
  return context.entities.Project.create({
    data: { name, clientName, githubRepo, userId: context.user.id },
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

export const updateProject = async (
  { id, name, clientName, githubRepo }: { id: string; name: string; clientName: string; githubRepo?: string },
  context: any
) => {
  if (!context.user) throw new HttpError(401)
  return context.entities.Project.update({
    where: { id },
    data: { name, clientName, githubRepo },
  })
}

export const deleteProject = async (
  { id }: { id: string },
  context: any
) => {
  if (!context.user) throw new HttpError(401)
  // Supprimer les activités et rapports liés d'abord
  await context.entities.Activity.deleteMany({ where: { projectId: id } })
  await context.entities.Report.deleteMany({ where: { projectId: id } })
  return context.entities.Project.delete({ where: { id } })
}

export const getReportByToken = async (
  { token }: { token: string },
  context: any
) => {
  const project = await context.entities.Project.findFirst({
    where: { shareToken: token },
    include: { activities: true, reports: true }
  })
  if (!project) throw new HttpError(404, 'Rapport introuvable')
  return project
}

export const getDashboardStats = async (_args: void, context: any) => {
  if (!context.user) throw new HttpError(401)
  const projects = await context.entities.Project.findMany({
    where: { userId: context.user.id },
    include: { activities: true, reports: true }
  })
  const totalProjects = projects.length
  const totalActivities = projects.reduce((acc: number, p: any) => acc + p.activities.length, 0)
  const totalReports = projects.reduce((acc: number, p: any) => acc + p.reports.length, 0)
  return { totalProjects, totalActivities, totalReports }
}