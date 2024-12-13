import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/AxiosConfig";

export const getBalance = createAsyncThunk(
    'transaction/getBalance',
    async (token) => {
        const response = await axiosInstance.get('/balance', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const topUp = createAsyncThunk(
    'transaction/topUp',
    async (token, dataTopUp) => {
        try {
            const response = await axiosInstance.post('/topup', dataTopUp, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error('failed:', error);
            return error.response
        }
    }
)

export const pembayaran = createAsyncThunk(
    'transaction/pembayaran',
    async (token, dataPembayaran) => {
        try {
            const response = await axiosInstance.post('/transaction', dataPembayaran, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error('failed:', error);
            return error.response
        }
    }
)

export const getTransaction = createAsyncThunk(
    'transaction/getTransaction',
    async (token) => {
        const response = await axiosInstance.get('/transaction/history', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const TransactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        dataBalance: null,
        loadingBalance: false,
        errorBalance: null,
        topUpAmount: null,
        loadingTopUp: false,
        pembayaran: null,
        loadingPembayaran: false,
        dataTransaction: null,
        loadingTransaction: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getBalance
            .addCase(getBalance.pending, (state) => {
                state.loadingBalance = true
                state.errorBalance = null
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.loadingBalance = false
                state.dataBalance = action.payload.data
            })

            //topUp
            .addCase(topUp.pending, (state) => {
                state.loadingTopUp = true
            })
            .addCase(topUp.fulfilled, (state, action) => {
                state.loadingTopUp = false
                state.topUpAmount = action.payload;
            })

            //pembayaran
            .addCase(pembayaran.pending, (state) => {
                state.loadingPembayaran = true
            })
            .addCase(pembayaran.fulfilled, (state, action) => {
                state.loadingPembayaran = false
                state.pembayaran = action.payload;
            })

            //getTransaction
            .addCase(getTransaction.pending, (state) => {
                state.loadingTransaction = true
            })
            .addCase(getTransaction.fulfilled, (state, action) => {
                state.loadingTransaction = false
                state.dataTransaction = action.payload
            })
    }
})

export default TransactionSlice.reducer