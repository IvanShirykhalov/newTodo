import React, {useReducer} from 'react';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [todolist_ID: string]: Array<TaskType>
}

function AppWithReducer() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todoListId2, title: "What to buy", filter: "all", addedDate: '', order: 0},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {
                id: v1(),
                title: 'HTML',
                status: TaskStatuses.Completed,
                todoListId: todoListId1,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: todoListId1,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.New,
                todoListId: todoListId1,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },],
        [todoListId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: todoListId2,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'Bread',
                status: TaskStatuses.New,
                todoListId: todoListId2,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'Buns',
                status: TaskStatuses.Completed,
                todoListId: todoListId2,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
        ]
    })


    const addTask = (title: string, todolistId: string) => {
        dispatchToTasks(addTaskAC(title, todolistId))
    }
    const changeTaskStatus = (taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskID, status, todoListID))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }
    const removeTask = (task_ID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(task_ID, todoListID))
    }


    const removeTodoList = (todoListID: string) => {
        dispatchToTodoLists(removeTodolistAC(todoListID))
        dispatchToTasks(removeTodolistAC(todoListID))
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatchToTodoLists(changeTodolistFilterAC(todoListID, filter))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatchToTodoLists(changeTodolistTitleAC(todoListID, title))
    }


    const todoListComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType>;
        switch (tl.filter) {
            case 'active':
                tasksForRender = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                break
            case "completed":
                tasksForRender = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                break
            default:
                tasksForRender = tasks[tl.id]
        }


        return (
            <Grid item key={tl.id}>
                <Paper variant={"outlined"} style={{padding: "20px"}}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        task={tasksForRender}
                        removeTask={removeTask}
                        changeFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        );
    })

    return (
        <div className={"App"}>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color={"inherit"} arial-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm AddItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducer;


