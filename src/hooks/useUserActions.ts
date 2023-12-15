import { User, UserID, addNewUser, deleteUserById } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const addUser =  ({name, email, github}: User) => {
        dispatch(addNewUser({name, email, github}));
    }

    const removeUser = (id: UserID) => {
        dispatch(deleteUserById(id));
    }

    return {removeUser, addUser}
}