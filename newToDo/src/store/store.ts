import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionType, tasksReducer} from "./tasks-reducer";
import {TodoListActionType, todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TodoListActionType | TasksActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => ThunkDispatch<AppRootStateType, unknown,AppActionsType> = useDispatch
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
