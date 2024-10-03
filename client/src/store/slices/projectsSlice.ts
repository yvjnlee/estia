import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
    value: number;
}

const initialState: ExampleState = {
    value: 0,
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { increment, decrement, setValue } = projectsSlice.actions;

export default projectsSlice.reducer;
