import { queryKeys } from '@/react-query/constants'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateUserKey = (userId: number, _userToken: string) => {
    return [queryKeys.user, userId]
}

export const generateUserAppointmentsKey = (
    userId: number,
    userToken: string
) => {
    return [queryKeys.appointments, queryKeys.user, userId, userToken]
}
