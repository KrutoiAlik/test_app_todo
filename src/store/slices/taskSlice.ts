import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Task} from "../../types/Task";

export const taskAdapter = createEntityAdapter<Task>();

const taskSlice = createSlice({
    name: 'tasks',
    initialState: taskAdapter.getInitialState(),
    reducers: {
        addTask: taskAdapter.addOne,
        removeTask: taskAdapter.removeOne,
        updateTask: taskAdapter.updateOne
    }
});

export const {addTask, removeTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;