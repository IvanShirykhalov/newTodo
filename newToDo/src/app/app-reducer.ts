export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: StatusActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: "APP/SET-STATUS", status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
    return {type: 'APP/SET-IS-INITIALIZED', isInitialized} as const
}


export type setAppStatusAT = ReturnType<typeof setAppStatusAC>
export type setAppErrorAT = ReturnType<typeof setAppErrorAC>
export type setIsInitializedAT = ReturnType<typeof setIsInitializedAC>
export type StatusActionsType = setAppStatusAT | setAppErrorAT | setIsInitializedAT