import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reposReducer from './reposSlice';
import authReducer from './authSlice';
console.log("store");
const store = configureStore({
  reducer: {
    repos: reposReducer,
    auth: authReducer
  },
  middleware: [thunk],
});

export default store;
