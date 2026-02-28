import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import uiReducer from './uiSlice';
import authReducer from './authSlice';
import exercisesReducer from './exercisesSlice';
import progressReducer from './progressSlice';
import dashboardReducer from './dashboardSlice';
import instructorReducer from './instructorSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    exercises: exercisesReducer,
    progress: progressReducer,
    dashboard: dashboardReducer,
    instructor: instructorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
