import {Dispatch} from 'redux';
import {setAppErrorAC, setAppStatusAC, StatusActionsType} from "./app-reducer";
import {ResponseType} from "./api/todolist-api";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<StatusActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<StatusActionsType>) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}
