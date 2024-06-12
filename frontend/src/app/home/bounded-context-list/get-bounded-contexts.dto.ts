export interface BoundedContext {
    boundedContextId: number,
    boundedContextName: string
}

export type GetBoundedContextsResponse = BoundedContext[];