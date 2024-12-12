import { configureStore } from "@reduxjs/toolkit"
import memberSlice from '../features/MemberSlice'
import authSlice from "../features/AuthSlice"
import authMiddleware from "../middleware/AuthMiddleware"

export const store = configureStore({
    reducer: {
        member: memberSlice,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authMiddleware),
})