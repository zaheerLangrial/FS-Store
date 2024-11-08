import { createSlice } from "@reduxjs/toolkit";

const SignUpSlice = createSlice({
    name: 'signup',
    initialState: {
        user: null,
        error: false,
        loading: false,
        success: false
    },
    reducers: {
        signUpRequest: (state) => {
            state.loading = true
            state.error = false
            state.success = false
        },
        signUpSuccess: (state, action) => {
            state.user = action.payload
            state.loading = false
            state.success = true
        },
        signUpFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
            state.success = false
        }
    }
})



export const { signUpFailure, signUpRequest, signUpSuccess } = SignUpSlice.actions
export default SignUpSlice.reducer