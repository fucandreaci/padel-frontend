import {createReducer} from '@reduxjs/toolkit';
import { MaestriState } from './types';
import {maestriAction} from './maestri.action';

const initialState: MaestriState = {
    maestri: [],
    isLoading: false,
};

export const maestriReducer = {
    maestri: createReducer(initialState, (builder) => {
        builder.addCase(maestriAction.fetchMaestri.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            }
        });

        builder.addCase(maestriAction.fetchMaestri.fulfilled, (state, action) => {
            return {
                ...state,
                maestri: action.payload,
                isLoading: false,
                error: undefined,
            }
        });

        builder.addCase(maestriAction.fetchMaestri.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });
    })
};
