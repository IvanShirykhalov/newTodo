import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";

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
export const fetchTodolist = (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(fetchTodolistAC(res.data))
        })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(id).then((res) => {
        dispatch(removeTodolistAC(id))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(title))
        })
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}