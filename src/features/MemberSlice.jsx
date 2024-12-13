import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/AxiosInstance";

export const registerMember = createAsyncThunk(
    'member/registerMember',
    async (registerData) => {
        try {
            const response = await axiosInstance.post('/registration', registerData)
            return response.data
        } catch (error) {
            console.error('Registration failed:', error);
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
        dataMember:null, 
        loadingMember: false,
        errorMember: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerMember.pending, (state) => {
                state.loadingMember = true
                state.errorMember = null
            })
            .addCase(registerMember.fulfilled, (state, action) => {
                state.loadingMember = false
                state.dataMember = action.payload;
            })
            .addCase(registerMember.rejected, (state, action) => {
                state.loadingMember = false
                state.errorMember = action.payload
            })
            //getProfileMember
            .addCase(getProfileMember.pending, (state) => {
                state.loadingMember = true
                state.errorMember = null
            })
            .addCase(getProfileMember.fulfilled, (state, action) => {
                state.loadingMember = false
                state.dataMember = action.payload
            })
    }
})

export default MemberSlice.reducer