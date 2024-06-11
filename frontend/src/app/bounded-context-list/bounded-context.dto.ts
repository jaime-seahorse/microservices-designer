export interface CreateBoundedContextRequest {
  boundedContextName: string
}

export interface CreateBoundedContextResponse {
  message: string
}

export interface BoundedContext {
    boundedContextId: number,
    boundedContextName: string
}

export type GetBoundedContextsResponse = BoundedContext[];