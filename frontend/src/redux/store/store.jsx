// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import StoreSaga from '../sagas';
import AuthReducer from '../slices/AuthSlice';
import SignupReducer from '../slices/SignUpSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    signup: SignupReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(StoreSaga);

export default store;
