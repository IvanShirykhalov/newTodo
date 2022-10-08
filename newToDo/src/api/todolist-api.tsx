import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '0c2de323-eb53-4ebd-b722-6248960ba08c'
    }

})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type CreateTasksResponseType = {
    error: string | null
    totalCount: number
    resultCode: number
    items: TaskType[]
}
/*type CreateTodolistResponseType = {
    data: {}
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}*/