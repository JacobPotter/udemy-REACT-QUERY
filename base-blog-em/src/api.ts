import axios from 'axios'
import { CommentsResponse, Post, PostsResponse } from './types/posts'

export async function fetchPosts(pageNum = 1) {
    const response = await axios.get<PostsResponse>(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
    )
    return response.data
}

export async function fetchComments(postId: number) {
    const response = await axios.get<CommentsResponse>(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    )
    return response.data
}

export async function deletePost(postId: number) {
    const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        { method: 'DELETE' }
    )
    return response.data
}

export async function updatePost(postId: number) {
    const response = await axios.patch<Post>(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        { data: { title: 'REACT QUERY ROCKS' } }
    )
    return response.data
}
