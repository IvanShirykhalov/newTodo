import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType} from "./store";
import {setAppErrorAC, setAppErrorAT, setAppStatusAC} from "../app-reducer";

export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type fetchTodolistAT = ReturnType<typeof fetchTodolistAC>

export type TodoListActionType =
    removeTodolistAT
    | addTodolistAT
    | changeTodolistFilterAT
    | changeTodolistTitleAT
    | fetchTodolistAT
    | setAppErrorAT

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: TodoListActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [...state, {
                id: action.todolistId, title: action.title, filter: "all", addedDate: '', order: 0
            }]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter})
        case "SET-TODOLISTS":
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}


//AC
export const removeTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", id} as const
}
export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()} as const
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


//TC
export const fetchTodolist = (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(fetchTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTodolist(id).then(() => {
        dispatch(removeTodolistAC(id))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(res.data.messages[0]))
            }
        })
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}