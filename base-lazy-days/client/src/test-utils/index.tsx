import { ChakraProvider } from '@chakra-ui/react'
import { render as RtlRender } from '@testing-library/react'
import { PropsWithChildren, ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { DEFAULT_QUERY_CLIENT_CONFIG } from '@/react-query/queryClient'

// ** FOR TESTING CUSTOM HOOKS ** //
// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
export const createQueryClientWrapper = () => {
    const queryClient = generateQueryClient()
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export const generateQueryClient = () => {
    DEFAULT_QUERY_CLIENT_CONFIG.defaultOptions.queries.retry = false
    return new QueryClient(DEFAULT_QUERY_CLIENT_CONFIG)
}

// reference: https://testing-library.com/docs/react-testing-library/setup#custom-render
function customRender(ui: ReactElement, client?: QueryClient) {
    const queryClient = client ?? generateQueryClient()
    return RtlRender(
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>{ui}</MemoryRouter>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

// override render method
export { customRender as render }
