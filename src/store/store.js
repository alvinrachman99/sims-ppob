import { configureStore } from "@reduxjs/toolkit"
import MemberSlice from '../features/MemberSlice'
import AuthSlice from "../features/AuthSlice"
import TransactionSlice from "../features/TransactionSlice"
import InformationSlice from "../features/InformationSlice"
import AuthMiddleware from "../middleware/AuthMiddleware"

export const store = configureStore({
    reducer: {
        member: MemberSlice,
        auth: AuthSlice,
        transaction: TransactionSlice,
        information: InformationSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(AuthMiddleware),
})