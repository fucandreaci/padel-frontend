import {createReducer} from '@reduxjs/toolkit';
import { AmiciState } from './types';
import {amiciAction} from './amici.action';

const initialState: AmiciState = {
    amici: [],
    availableAmici: [],
    isLoading: false,
};

export const amiciReducer = {
    amici: createReducer(initialState, (builder) => {
        builder.addCase(amiciAction.fetchAmici.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            }
        });

        builder.addCase(amiciAction.fetchAmici.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                amici: action.payload,
                error: undefined
            }
        });

        builder.addCase(amiciAction.fetchAmici.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });

        builder.addCase(amiciAction.fetchAvailableAmici.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            }
        });

        builder.addCase(amiciAction.fetchAvailableAmici.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                availableAmici: action.payload,
                error: undefined
            }
        });

        builder.addCase(amiciAction.fetchAvailableAmici.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });

        builder.addCase(amiciAction.inviaRichiesta.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: undefined
            }
        });

        builder.addCase(amiciAction.inviaRichiesta.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                availableAmici: state.availableAmici.filter(a => a.idAmico !== action.payload.idAmico),
                amici: [action.payload, ...state.amici],
                error: undefined
            }
        });

        builder.addCase(amiciAction.inviaRichiesta.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });
    })
};
