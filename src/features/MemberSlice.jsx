import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/AxiosConfig";

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
    async (token) => {
        const response = await axiosInstance.get('/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const updateProfile = createAsyncThunk(
    'member/updateProfile',
    async ({token, profile}) => {
        try {
            const response = axiosInstance.put('/profile/update', profile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            return error.response            
        }
    }
)

export const updateProfileImage = createAsyncThunk(
    'member/updateProfileImage',
    async ({token, file}) => {
        const formData = new FormData();
        formData.append('file', file); 
        
        try {
          const response = await axiosInstance.put('/profile/image', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        } catch (error) {
          return error;
        }
    }
)

const MemberSlice = createSlice({
    name: 'member',
    initialState: {
        dataMember:null, 
        loadingMember: false,
        errorMember: null,
    },
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
                state.dataMember = action.payload.data
            })

            //updateProfile
            .addCase(updateProfile.pending, (state) => {
                state.loadingMember = true
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loadingMember = false
            })

            //updateProfileImage
            .addCase(updateProfileImage.pending, (state) => {
                state.loadingMember = true
            })
            .addCase(updateProfileImage.fulfilled, (state) => {
                state.loadingMember = false
            })
    }
})

export default MemberSlice.reducer