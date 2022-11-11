import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunk} from "../../app/store";
import {RequestStatusType, setAppErrorAT, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export const todolistsReducer = (state = initialState, action: TodoListActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter})
        case "SET-TODOLISTS":
            return action.todos.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case "CHANGE-TODOLIST-ENTITY-STATUS" :
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}


//AC
export const removeTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", id} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: "ADD-TODOLIST", todolist} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}
export const fetchTodolistAC = (todos: TodolistType[]) => {
    return {type: "SET-TODOLISTS", todos} as const
}
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: "CHANGE-TODOLIST-ENTITY-STATUS", id, entityStatus} as const
}


//TC
export const fetchTodolist = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(fetchTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
            return res.data
        }).then((todos) => {
        todos.forEach((tl) => {
            dispatch(fetchTasksTC(tl.id))
        })
    })
        .catch((e: AxiosError) => {
            handleServerNetworkError(e, dispatch)
        })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(id, 'loading'))
    todolistAPI.deleteTodolist(id).then(() => {
        dispatch(removeTodolistAC(id))
        dispatch(setAppStatusAC('succeeded'))
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })

}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}


//types
const initialState: Array<TodolistDomainType> = []

export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type fetchTodolistAT = ReturnType<typeof fetchTodolistAC>
export type changeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export type TodoListActionType =
    removeTodolistAT
    | addTodolistAT
    | changeTodolistFilterAT
    | changeTodolistTitleAT
    | fetchTodolistAT
    | setAppErrorAT
    | changeTodolistEntityStatusAT

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

