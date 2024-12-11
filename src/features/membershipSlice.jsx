import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

export const registerMembership = createAsyncThunk(
    'membership/registerMembership',
    async (registerData) => {
        try {
            console.log('Registering user with data:', registerData);  // Debug data yang dikirim
            const response = await axiosInstance.post('/registration', registerData)
            return response.data
        } catch (error) {
            console.error('Registration failed:', error); // Debug error
            return error.response.data
        }
    }
)

export const getMembership = createAsyncThunk(
    'membership/getMembership',
    async () => {
        const response = await axiosInstance.get('/profile')
        return response.data
    }
)

const membershipSlice = createSlice({
    name: 'membership',
    initialState: {
        user:null, 
        loading: false,
        error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerMembership.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerMembership.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload; // Menyimpan data user dari response
            })
            .addCase(registerMembership.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //getMembership
            .addCase(getMembership.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export default membershipSlice.reducer