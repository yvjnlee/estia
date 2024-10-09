import { combineReducers } from "redux";
import projectReducer from "./slices/projectSlice";
import userReducer from "./slices/userSlice";

export const rootReducer = combineReducers({
    projects: projectReducer,
    users: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
