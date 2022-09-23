import {createReducer} from '@reduxjs/toolkit';
import { InfoVarieState } from './types';
import {infoVarieAction} from './infoVarie.action';

const initialState: InfoVarieState = {
    infoVarie: [],
    regole: [],
    orariStruttura: [],
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
                infoVarie: action.payload.infoVarie,
                orariStruttura: action.payload.orariStruttura,
                regole: action.payload.regole,
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
