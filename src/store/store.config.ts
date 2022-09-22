import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import rootReducer, {RootState} from './reducer.config';
import {useDispatch} from 'react-redux';

const store = configureStore({
    reducer: rootReducer,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store
