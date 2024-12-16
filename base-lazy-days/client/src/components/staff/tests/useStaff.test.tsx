import { act, renderHook, waitFor } from '@testing-library/react'

import { useStaff } from '../hooks/useStaff'

import { createQueryClientWrapper } from '@/test-utils'

test('filter staff', async () => {
    const { result } = renderHook(() => useStaff(), {
        wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.staff.length).toBeGreaterThan(0))

    const unfilteredStaff = result.current.staff.length

    act(() => {
        result.current.setFilter('massage')
    })

    await waitFor(() =>
        expect(result.current.staff.length).toBeLessThan(unfilteredStaff)
    )
})
