import { userDB } from "../common/types/users";
import { fetchUserById, fetchUserByUsername, fetchUsers } from "../store/slices/userSlice";
import { AppDispatch } from "../store/store";

const mapUsertData = (user: userDB) => {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
    };
};

export const getUsers = async (dispatch: AppDispatch) => {
    const users = await dispatch(fetchUsers()).unwrap();
    const mappedUsers = users.map((user: userDB) => mapUsertData(user));
    return mappedUsers;
};

export const getUserById = async (dispatch: AppDispatch, userId: string) => {
    const user = await dispatch(fetchUserById(userId)).unwrap();
    return mapUsertData(user);
};

export const getUserByUsername = async (dispatch: AppDispatch, username: string) => {
    const user = await dispatch(fetchUserByUsername(username)).unwrap();

    if (!user) {
        return null;
    }
    return mapUsertData(user);
};
