// src/sagas/authSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from '../slices/AuthSlice';
import { signUpFailure, signUpRequest, signUpSuccess } from '../slices/SignUpSlice';
import { message } from 'antd';

function* handleLogin(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:8005/api/signin/', {
            email: action.payload.username,
            password: action.payload.password,
        });
        // Save the token to local storage
        const token = response.data.access; // Adjust this if the token is nested differently
        console.log('token===>', token)
        localStorage.setItem('authToken', token);
        yield put(loginSuccess(response.data));
        
    } catch (error) {
        yield put(loginFailure(error.response?.data || error.message));
    }
}

function* handleSignup(action) {
    try {
        const { username, email, password, age, address, mobile_number, profilePicture } = action.payload;
        // Create FormData here
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('age', age);
    formData.append('address', address);
    formData.append('mobile_number', mobile_number);
    formData.append('profile_picture', profilePicture);
        const res = yield call(axios.post, 'http://localhost:8005/api/signup/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            }
        })
        yield put(signUpSuccess(res.data))
        message.success("Sign up successful!");
    } catch (error) {
        yield put(signUpFailure(error.response?.data || error.message))
        message.error("Sign up failed! Please try again.");
    }
}

export default function* StoreSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(signUpRequest.type, handleSignup)
}
