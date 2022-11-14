import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"}
    ]
})

test('correct todolist should be remove', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId1)

})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC({title: newTodolistTitle, addedDate: '', order: 0, id :v1()}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[1].filter).toBe('completed')
    expect(endState[0].filter).toBe('all')
})

test('correct title of todolist should be changed', () => {
    let newTitle: string = 'New Title'

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTitle))

    expect(endState[1].title).toBe('New Title')
    expect(endState[0].title).toBe('What to learn')
})

test('correct title of todolist should be changed', ()=>{
    const  endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId2, 'loading'))

    expect(endState[1].entityStatus).toBe('loading')
    expect(endState[0].entityStatus).toBe('idle')
})