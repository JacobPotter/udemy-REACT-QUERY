import { fetchComments } from './api.js'
import './PostDetail.css'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Post } from './types/posts'

interface PostDetailProps {
    post: Post
    deleteMutation: ReturnType<typeof useMutation>
    updateMutation: ReturnType<typeof useMutation>
}

export function PostDetail({
    post,
    deleteMutation,
    updateMutation,
}: PostDetailProps) {
    // replace with useQuery
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['comments', post.id],
        queryFn: () => fetchComments(post.id),
        staleTime: 10000,
    })

    if (isLoading) {
        return <h3>Loading...</h3>
    }

    if (isError) {
        return (
            <>
                <h3>Error</h3>
                <p>{error.message}</p>
            </>
        )
    }
    const handleDelete = () => {
        deleteMutation.mutate(post.id)
    }

    const handleUpdate = () => {
        updateMutation.mutate(post.id)
    }

    return (
        <>
            <h3 style={{ color: 'blue' }}>{post.title}</h3>
            <div>
                <button onClick={handleDelete}>Delete</button>
                {deleteMutation.isPending && (
                    <p className={'loading'}>Deleting the post</p>
                )}
                {deleteMutation.isError && (
                    <p className={'error'}>
                        Error deleting the post: {error.message}
                    </p>
                )}
                {deleteMutation.isSuccess && (
                    <p className={'success'}>Post was deleted</p>
                )}
            </div>
            <div>
                <button onClick={handleUpdate}>Update title</button>
                {updateMutation.isPending && (
                    <p className={'loading'}>Updating the post</p>
                )}
                {updateMutation.isError && (
                    <p className={'error'}>
                        Error updating the post: {error.message}
                    </p>
                )}
                {updateMutation.isSuccess && (
                    <p className={'success'}>Post was successfully updated</p>
                )}
            </div>
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    )
}
