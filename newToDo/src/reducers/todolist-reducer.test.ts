import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be remove', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'Whta to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)

})

test('correct todolist should be added', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'Whta to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))


    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})

test('correct filter of todolist should be changed', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState,changeTodolistFilterAC(todolistId2,newFilter))

    expect(endState[1].filter).toBe('completed')
    expect(endState[0].filter).toBe('all')
})

test('correct title of todolist should be changed', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTitle: string = 'New Title'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState,changeTodolistTitleAC(todolistId2, newTitle))

    expect(endState[1].title).toBe('New Title')
    expect(endState[0].title).toBe('What to learn')
})