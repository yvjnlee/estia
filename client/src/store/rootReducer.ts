import { combineReducers } from "redux";
import projectsSlice from "../store/slices/projectsSlice";

export const rootReducer = combineReducers({
    projects: projectsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
