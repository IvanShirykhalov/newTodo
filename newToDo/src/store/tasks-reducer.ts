import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAT, fetchTodolistAT, removeTodolistAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";


export type removeTaskAT = ReturnType<typeof removeTaskAC>
export type addTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type setTasksAT = ReturnType<typeof setTasksAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksActionType =
    removeTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | addTodolistAT
    | removeTodolistAT
    | fetchTodolistAT
    | setTasksAT

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
                /*                ...state,
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
                                }, ...state[action.todolistId]]*/
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
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todos.forEach((todo) => {
                stateCopy[todo.id] = []
            })
            return stateCopy
        case "SET-TASKS":
            return {
                ...state,
                [action.todoId]: action.tasks
            }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}

export const addTaskAC = (task: TaskType) => {
    return {type: "ADD-TASK", task} as const
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, status, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}

export const setTasksAC = (todoId: string, tasks: TaskType[]) => {
    return {type: "SET-TASKS", todoId, tasks} as const
}


export const fetchTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTasksAC(todoId, res.data.items))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTasks(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })

}


export const updateTaskStatusTC = (taskID: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskID)
    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            status: status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }
        todolistAPI.updateTask(todolistId, taskID, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskID, status, todolistId))
            })
    }
}

export const updateTaskTitleTC = (taskID: string, todolistId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskID)
    if (task) {
        const model: UpdateTaskModelType = {
            title: title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }
        todolistAPI.updateTask(todolistId, taskID, model)
            .then((res) => {
                dispatch(changeTaskTitleAC(taskID, title, todolistId))
            })
    }
}
