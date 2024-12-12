import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/AxiosInstance";

export const getBalance = createAsyncThunk(
    'transaction/getBalance',
    async () => {
        const response = await axiosInstance.get('/balance')
        return response.data
    }
)

export const TransactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        dataTransaction: null,
        loadingTransaction: false,
        errorTransaction: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getBalance
            .addCase(getBalance.pending, (state) => {
                state.loadingTransaction = true
                state.errorTransaction = null
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.loadingTransaction = false
                state.dataTransaction = action.payload
            })
    }
})

export default TransactionSlice.reducer