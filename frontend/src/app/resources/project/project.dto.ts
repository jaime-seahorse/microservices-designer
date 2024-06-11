export interface CreateProjectRequest {
  projectName: string
}

export interface CreateProjectResponse {
  message: string
}

export interface Project {
    projectId: number,
    projectName: string
}

export type GetProjectsResponse = Project[];