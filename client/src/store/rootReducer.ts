import { combineReducers } from "redux";
import projectReducer from "./slices/projectSlice";
import userReducer from "./slices/userSlice";
import commentReducer from "./slices/commentSlice";

export const rootReducer = combineReducers({
    projects: projectReducer,
    users: userReducer,
    comments: commentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
