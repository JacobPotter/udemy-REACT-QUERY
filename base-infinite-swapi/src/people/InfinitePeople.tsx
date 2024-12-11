import InfiniteScroll from 'react-infinite-scroller'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPeople, initialPeopleUrl } from '../api'
import { Person } from './Person'

export function InfinitePeople() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['sw-people'],
        initialPageParam: initialPeopleUrl,
        queryFn: ({ pageParam }) => fetchPeople(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.next
        },
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
                    return page.results.map((person) => (
                        <Person
                            key={person.name}
                            name={person.name}
                            hairColor={person.hair_color}
                            eyeColor={person.eye_color}
                        />
                    ))
                })}
            </InfiniteScroll>
        </>
    )
}
