import { configureStore } from "@reduxjs/toolkit"
import membershipSlice from "../features/membershipSlice"
import authSlice from "../features/authSlice"
import authMiddleware from "../middleware/authMiddleware"

export const store = configureStore({
    reducer: {
        membership: membershipSlice,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authMiddleware),
})