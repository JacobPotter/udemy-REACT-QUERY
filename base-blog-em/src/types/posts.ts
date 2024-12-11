export interface Post {
    id: number
    userId: number
    title: string
    body: string
}

export type PostsResponse = Post[]

export interface Comment {
    id: number
    postId: number
    name: string
    email: string
    body: string
}

export type CommentsResponse = Comment[]
