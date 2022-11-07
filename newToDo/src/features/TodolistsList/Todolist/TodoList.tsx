import React, {FC, memo, useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType} from "../todolists-reducer";
import {fetchTasksTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/store";
import {Button, IconButton, List} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import {RequestStatusType} from "../../../app/app-reducer";

type TodoListPropsType = {
    todoListId: string
    title: string
    entityStatus: RequestStatusType
    task: TaskType[];
    filter: FilterValuesType
    removeTask: (todolistID: string, taskID: string) => void;
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    removeTodoList: (todolistID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    demo: boolean
}

export const TodoList: FC<TodoListPropsType> = memo(({demo = false, ...props}) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todoListId))
    }, [dispatch])

    let tasks = props.task
    switch (props.filter) {
        case 'active':
            tasks = tasks.filter(t => t.status === TaskStatuses.New)
            break;
        case "completed":
            tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
            break;
        default:
            break;
    }

    const taskItem = props.task.length ?
        tasks.map(t => {
            return (<Task key={t.id}
                          task={t}
                          todolistId={props.todoListId}
                          entityStatus={props.entityStatus}
            />)
        }) : <span>Tasks list is empty</span>

    const addTask = useCallback((title: string) => props.addTask(title, props.todoListId), [props.addTask, props.todoListId])
    const removeTodolist = () => props.removeTodoList(props.todoListId)
    const handlerCreator = (filter: FilterValuesType) => props.changeFilter(filter, props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)


    return (
        <div>
            <h3>
                <IconButton onClick={removeTodolist} color={"secondary"} disabled={props.entityStatus === 'loading'}>
                    <DeleteOutline/>
                </IconButton>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

            </h3>
            <AddItemForm AddItem={addTask}/>
            <List>
                {taskItem}
            </List>
            <div>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    onClick={() => handlerCreator('all')}>All
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    onClick={() => handlerCreator('active')}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    onClick={() => handlerCreator('completed')}>Completed
                </Button>
            </div>
        </div>
    );
})