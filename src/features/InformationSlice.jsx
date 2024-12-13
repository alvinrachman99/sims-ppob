import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/AxiosConfig";

export const getBanner = createAsyncThunk(
    'information/getBanner',
    async (token) => {
        const response = await axiosInstance.get('/banner', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const getServices = createAsyncThunk(
    'information/getServices',
    async (token) => {
        const response = await axiosInstance.get('/services', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const InformationSlice = createSlice({
    name: 'information',
    initialState: {
        dataBanner: null,
        loadingBanner: false,
        errorBanner: null,
        dataServices: null,
        loadingServices: false,
        errorServices: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getBanner
            .addCase(getBanner.pending, (state) => {
                state.loadingBanner = true
                state.errorBanner = null
            })
            .addCase(getBanner.fulfilled, (state, action) => {
                state.loadingBanner = false
                state.dataBanner = action.payload
            })
            //getServices
            .addCase(getServices.pending, (state) => {
                state.loadingServices = true
                state.errorServices = null
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.loadingServices = false
                state.dataServices = action.payload
            })
    }
})

export default InformationSlice.reducer