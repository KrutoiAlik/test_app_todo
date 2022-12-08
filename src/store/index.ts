import {configureStore} from "@reduxjs/toolkit";
import deskReducer from './slices/deskSlice';

const initState = loadStore();
const store = configureStore({
    preloadedState: initState,
    reducer: {
        desks: deskReducer
    },
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
        const defaultStore = {
            desks: {
                desks: [{
                    id: '1',
                    title: 'Desk 1',
                    tasks: []
                }]
            }
        }
        localStorage.setItem('state', JSON.stringify(defaultStore));
        return defaultStore;
    }

    return JSON.parse(state);
}