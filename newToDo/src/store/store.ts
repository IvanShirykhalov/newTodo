import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TasksActionType, tasksReducer} from "./tasks-reducer";
import {TodoListActionType, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkAction} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TodoListActionType | TasksActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

/*
import {configureStore} from "@reduxjs/toolkit";



export const store = configureStore({
    reducer: {
        todos: todosReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch*/
