import { act, renderHook, waitFor } from '@testing-library/react'

import { useAppointments } from '../hooks/useAppointments'
import { AppointmentDateMap } from '../types'

import { createQueryClientWrapper } from '@/test-utils'
import { expect } from 'vitest'

const getAppointmentCount = (appointments: AppointmentDateMap) => {
    return Object.values(appointments).reduce(
        (runningCount, appointmentsOnDate) =>
            runningCount + appointmentsOnDate.length,
        0
    )
}

test('filter appointments by availability', async () => {
    // test goes here
    const { result } = renderHook(() => useAppointments(), {
        wrapper: createQueryClientWrapper(),
    })

    await waitFor(() =>
        expect(
            getAppointmentCount(result.current.appointments)
        ).toBeGreaterThan(0)
    )

    const filteresAppointments = getAppointmentCount(
        result.current.appointments
    )

    act(() => {
        result.current.setShowAll(true)
    })

    await waitFor(() =>
        expect(
            getAppointmentCount(result.current.appointments)
        ).toBeGreaterThan(filteresAppointments)
    )
})
