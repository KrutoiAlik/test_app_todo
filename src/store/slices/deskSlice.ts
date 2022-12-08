import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Task = {
    id: string,
    title: string,
    status: string
}

export type Desk = {
    id: string,
    title: string,
    tasks: Task[]
}

type DeskState = {
    desks: Desk[]
}

const initialState: DeskState = {
    desks: []
}

const deskSlice = createSlice({
    name: 'desks',
    initialState,
    reducers: {
        addDesk(state, action: PayloadAction<string>) {
            state.desks.push({
                id: (state.desks.length + 1) + '',
                title: action.payload,
                tasks: []
            });
        },
        removeDesk(state, action: PayloadAction<string>) {
            state.desks = state.desks.filter(desk => desk.id !== action.payload);
        },
        updateTasks(state, action: PayloadAction<Desk>) {
            const selectedDesk = state.desks.find(desk => desk.id === action.payload.id);
            if (!selectedDesk) {
                throw new Error('Failed to find a desk with Id: ' + action.payload.id)
            }

            selectedDesk.tasks = action.payload.tasks;
        }
    }
});

export const {addDesk, removeDesk, updateTasks} = deskSlice.actions;

export default deskSlice.reducer;