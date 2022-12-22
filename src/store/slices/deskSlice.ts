import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Desk} from "../../types/Desk";

export const deskAdapter = createEntityAdapter<Desk>();
const deskSlice = createSlice({
    name: 'desks',
    initialState: deskAdapter.getInitialState(),
    reducers: {
        addDesk: deskAdapter.addOne,
        updateDesk: deskAdapter.updateOne,
        removeDesk: deskAdapter.removeOne
    }
});

export const {addDesk, updateDesk, removeDesk} = deskSlice.actions;
export default deskSlice.reducer;