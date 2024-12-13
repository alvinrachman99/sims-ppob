import { configureStore } from "@reduxjs/toolkit"
import MemberSlice from "../features/MemberSlice"
import LoginSlice from "../features/LoginSlice"
import TransactionSlice from "../features/TransactionSlice"
import InformationSlice from "../features/InformationSlice"
import AuthMiddleware from "../middleware/AuthMiddleware"

export const store = configureStore({
    reducer: {
        member: MemberSlice,
        auth: LoginSlice,
        transaction: TransactionSlice,
        information: InformationSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(AuthMiddleware),
})