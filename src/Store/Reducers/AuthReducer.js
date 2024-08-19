import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetails: {},
    token: '',
    login_status:false,
    host_status:false
};

export const authReducer = createSlice({
    name: 'authData',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },

        setUserDetails: (state, action) => {
            state.userDetails = action.payload
            state.login_status = true
        },
        setExtraUserDetails:(state,action)=>{
            state.userDetails = {...state.userDetails, ...action.payload}
        },
        setHostStatus:(state,action)=>{
            state.host_status = action.payload
        },
        resetHostStatus:(state,action)=>{
            state.host_status = false
        },
        resetAuthData: (state) => {
            state.userDetails = {}
            state.token = ""
            state.login_status = false
            state.host_status = false

        },

    },
});

// Action creators are generated for each case reducer function
export const {
    setToken,
    setUserDetails,
    setExtraUserDetails,
    resetAuthData,
    setHostStatus,resetHostStatus
} = authReducer.actions;

export default authReducer.reducer;
