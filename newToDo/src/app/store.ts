import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {TodoListActionType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer, StatusActionsType} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer,
    auth: authReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TodoListActionType | TasksActionType | StatusActionsType | AuthActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
/*export type AppDispatch = typeof store.dispatch*/
export const useAppDispatch: () => ThunkDispatch<AppRootStateType, unknown, AppActionsType> = useDispatch
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
