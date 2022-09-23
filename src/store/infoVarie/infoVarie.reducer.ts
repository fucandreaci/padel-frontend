import {createReducer} from '@reduxjs/toolkit';
import { InfoVarieState } from './types';
import {infoVarieAction} from './infoVarie.action';
import {utility} from '../../utils/utility';

const initialState: InfoVarieState = {
    infoVarie: [],
    isLoading: false,
};

export const infoVarieReducer = {
    infoVarie: createReducer(initialState, (builder) => {
        builder.addCase(infoVarieAction.fetchInfoVarie.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        });

        builder.addCase(infoVarieAction.fetchInfoVarie.fulfilled, (state, action) => {
            return {
                ...state,
                infoVarie: action.payload,
                isLoading: false,
                error: undefined
            }
        });

        builder.addCase(infoVarieAction.fetchInfoVarie.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message
            }
        });
    })
};
