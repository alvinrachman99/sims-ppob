import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/AxiosInstance";

export const registerMember = createAsyncThunk(
    'member/registerMember',
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

export const getProfileMember = createAsyncThunk(
    'member/getProfileMember',
    async () => {
        const response = await axiosInstance.get('/profile')
        return response.data
    }
)

const MemberSlice = createSlice({
    name: 'member',
    initialState: {
        user:null, 
        loading: false,
        error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerMember.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerMember.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload; // Menyimpan data user dari response
            })
            .addCase(registerMember.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //getProfileMember
            .addCase(getProfileMember.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export default MemberSlice.reducer