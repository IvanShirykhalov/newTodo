import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAT, removeTodolistAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


export type removeTaskAT = ReturnType<typeof removeTaskAC>
export type addTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | addTodolistAT | removeTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    addedDate: '',
                    deadline: '',
                    todoListId: action.todolistId,
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    description: ''
                }, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let copy = {...state}
            delete copy[action.id]
            return copy
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, status, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}