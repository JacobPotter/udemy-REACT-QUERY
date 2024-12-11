import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { deletePost, fetchPosts, updatePost } from './api'
import { PostDetail } from './PostDetail'

const maxPostPage = 10

export function Posts() {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedPost, setSelectedPost] = useState(null)

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: (postId: number) => deletePost(postId),
    })

    const updateMutation = useMutation({
        mutationFn: (postId: number) => updatePost(postId),
    })

    // replace with useQuery
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', currentPage],
        queryFn: () => fetchPosts(currentPage),
        staleTime: 1000 * 5,
    })

    const handlePrevious = () => {
        setCurrentPage((prevState) => prevState - 1)
    }

    const handleNext = () => {
        setCurrentPage((prevState) => prevState + 1)
    }

    useEffect(() => {
        if (currentPage < maxPostPage) {
            const nextPage = currentPage + 1
            queryClient.prefetchQuery({
                queryKey: ['posts', nextPage],
                queryFn: () => fetchPosts(nextPage),
                staleTime: 1000 * 60,
            })
        }
    }, [currentPage, queryClient])

    if (isLoading) return <h3>Loading...</h3>

    if (isError)
        return (
            <>
                <h3>Error</h3>
                <p>{error.message}</p>
            </>
        )

    return (
        <>
            <ul>
                {data.map((post) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => {
                            deleteMutation.reset()
                            updateMutation.reset()
                            setSelectedPost(post)
                        }}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button disabled={currentPage <= 1} onClick={handlePrevious}>
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button
                    disabled={currentPage >= maxPostPage}
                    onClick={handleNext}
                >
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && (
                <PostDetail
                    post={selectedPost}
                    deleteMutation={deleteMutation}
                    updateMutation={updateMutation}
                />
            )}
        </>
    )
}
