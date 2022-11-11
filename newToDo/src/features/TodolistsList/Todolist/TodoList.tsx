import React, {FC, memo, useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {changeTodolistFilterAC, changeTodolistTitleTC, FilterValuesType, removeTodolistTC} from "../todolists-reducer";
import {createTaskTC, fetchTasksTC} from "../tasks-reducer";
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
    demo: boolean
}

export const TodoList: FC<TodoListPropsType> = memo(({demo = false, ...props}) => {


    const dispatch = useAppDispatch()

/*    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todoListId))
    }, [dispatch])*/

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

    const addTask = useCallback((title: string) => dispatch(createTaskTC(props.todoListId, title)), [dispatch])
    const removeTodolist = () => dispatch(removeTodolistTC(props.todoListId))
    const handlerCreator = (filter: FilterValuesType) => dispatch(changeTodolistFilterAC(props.todoListId, filter))
    const changeTodoListTitle = (title: string) => dispatch(changeTodolistTitleTC(props.todoListId, title))

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