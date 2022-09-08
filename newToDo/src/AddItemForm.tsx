import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";


type AddItemFormPropsType = {
    AddItem: (title: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            trimmedTitle && props.AddItem(trimmedTitle)

        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <TextField
                label={"Title"}
                size={"small"}
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyDown={onKeyDownAddItem}
                error={error}
                helperText={error && "Title is required!"}/>
            <IconButton>
                <AddCircleOutline onClick={addItem}/>
            </IconButton>
        </div>
    );
};
