import {
    addTodolistAT,
    changeTodolistEntityStatusAC,
    clearTodolistDataAT,
    fetchTodolistAT,
    removeTodolistAT
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "../../app/store";
import {TasksStateType} from "../../app/AppWithRedux";
import {RequestStatusType, setAppErrorAT, setAppStatusAC, setAppStatusAT} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolist.id]: []
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
            return {...state, [action.todoId]: action.tasks}
        case "CHANGE-TASK-ENTITY-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t)
            }
        }
        case "CLEAR-TODOLIST-DATA":
            return {}
        default:
            return state
    }
}

//AC
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: "REMOVE-TASK", todolistId, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: "ADD-TASK", task} as const
}
export const setTasksAC = (todoId: string, tasks: TaskType[]) => {
    return {type: "SET-TASKS", todoId, tasks} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}
export const changeTaskEntityStatusAC = (taskId: string, todolistId: string, entityStatus: RequestStatusType) => {
    return {type: "CHANGE-TASK-ENTITY-STATUS", taskId, todolistId, entityStatus} as const
}


//TC
export const fetchTasksTC = (todoId: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    todolistAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTasksAC(todoId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'loading'))
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTasks(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })

}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch((e: AxiosError) => {
            handleServerNetworkError(e, dispatch)
        })
    }


// types

const initialState: TasksStateType = {}
export type removeTaskAT = ReturnType<typeof removeTaskAC>
export type addTaskAT = ReturnType<typeof addTaskAC>
export type setTasksAT = ReturnType<typeof setTasksAC>
export type updateTaskAT = ReturnType<typeof updateTaskAC>
export type changeTaskEntityStatusAT = ReturnType<typeof changeTaskEntityStatusAC>

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
    | addTodolistAT
    | removeTodolistAT
    | fetchTodolistAT
    | setTasksAT
    | updateTaskAT
    | setAppStatusAT
    | setAppErrorAT
    | changeTaskEntityStatusAT
    | clearTodolistDataAT