import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";


type AddItemFormPropsType = {
    AddItem: (title: string) => void
    disabled?: boolean
}


export const AddItemForm = memo(({AddItem, disabled = false}: AddItemFormPropsType) => {

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
            trimmedTitle && AddItem(trimmedTitle)

        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <TextField
                disabled={disabled}
                label={"Title"}
                size={"small"}
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyDown={onKeyDownAddItem}
                helperText={error && "Title is required!"}/>
            <IconButton disabled={disabled}>
                <AddCircleOutline onClick={addItem}/>
            </IconButton>
        </div>
    );
})
