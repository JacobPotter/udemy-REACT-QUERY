import InfiniteScroll from 'react-infinite-scroller'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchSpecies, initialSpeciesUrl } from '../api'
import { Species } from './Species'

export function InfiniteSpecies() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        initialPageParam: initialSpeciesUrl,
        queryKey: ['sw-species'],
        queryFn: ({ pageParam }) => fetchSpecies(pageParam),
        getNextPageParam: (lastPage) => lastPage.next,
    })

    if (isLoading) {
        return <h3 className={'loading'}>Loading...</h3>
    }

    if (isError) {
        return (
            <>
                <h3 className={'error'}>Error</h3>
                <p>{error.message}</p>
            </>
        )
    }

    return (
        <>
            {isFetching && <h3 className={'loading'}>Loading...</h3>}
            <InfiniteScroll
                initialLoad={false}
                hasMore={hasNextPage}
                loadMore={() => {
                    if (!isFetching) {
                        fetchNextPage()
                    }
                }}
            >
                {data.pages.map((page) => {
                    return page.results.map((species) => (
                        <Species
                            name={species.name}
                            language={species.language}
                            averageLifespan={species.average_lifespan}
                        />
                    ))
                })}
            </InfiniteScroll>
        </>
    )
}
