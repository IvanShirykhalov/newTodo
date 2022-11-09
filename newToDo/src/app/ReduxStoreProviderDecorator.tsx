import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: "JS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: "React Book",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ]
    },
    app: {
        status: 'loading',
        error: null
    },
    auth: {
        isLoggedIn: true
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storeFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storeFn()}</Provider>
}