import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserID = string;

export interface User {
    name: string;
    email: string;
    github: string
}

export interface UserWithId extends User {
    id: UserID;

}

interface UsersState {
    entities: []
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | undefined
}

const initialState = {
    entities: [],
    status: 'idle',
} as UsersState


const DEFAULT_STATE: UserWithId[] = [
    {
        id: "1",
        name: "Pedro picapiedra",
        email: "pedropiedra@gmail.com",
        github: "Pedropicapiedra",
    },
    {
        id: "2",
        name: "Oscar trebol",
        email: "oscartrebol@gmail.com",
        github: "Oscartrebol",
    },
    {
        id: "3",
        name: "Sergio Uriarte",
        email: "sergiouri@gmail.com",
        github: "SergioUri",
    },
]


export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async () => {
        try {
            const persistedState = localStorage.getItem("__redux__state__");
            return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
        } catch (error) {
            throw new Error("Error al obtener usuarios");
        }
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        /* addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, { id, ...action.payload, status: 'idle' }]
        },
        deleteUserById: (state, action: PayloadAction<UserID>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        } */
    },
    extraReducers(builder) {
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.status = 'pending';
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.entities.push(action.payload)
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message
        });
    },
})

export default usersSlice.reducer;