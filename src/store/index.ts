import {combineReducers, configureStore} from "@reduxjs/toolkit";
import deskReducer from './slices/deskSlice';
import taskReducer from './slices/taskSlice';

const initState = loadStore();

const store = configureStore({
    preloadedState: initState,
    reducer: combineReducers({
        desks: deskReducer,
        tasks: taskReducer
    }),
})

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

function loadStore() {

    const state = localStorage.getItem('state') || "";

    if (!state) {
        return {};
    }

    return JSON.parse(state);
}