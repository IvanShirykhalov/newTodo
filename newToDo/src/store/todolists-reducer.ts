import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>

type ActionType = removeTodolistAT | addTodolistAT | changeTodolistFilterAT | changeTodolistTitleAT

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
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
        default:
            return state
    }
}

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