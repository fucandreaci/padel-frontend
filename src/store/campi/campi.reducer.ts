import {createReducer} from '@reduxjs/toolkit';
import {CampiState} from './types';
import {campiAction} from './campi.action';

const initialState: CampiState = {
    campi: [],
    isLoading: false,
};

export const campiReducer = {
    campi: createReducer(initialState, (builder) => {
        builder.addCase(campiAction.getAll.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            }
        });

        builder.addCase(campiAction.getAll.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                campi: action.payload,
                error: undefined
            }
        });

        builder.addCase(campiAction.getAll.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });

        builder.addCase(campiAction.deleteById.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            }
        });

        builder.addCase(campiAction.deleteById.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                campi: state.campi.filter(campo => campo.id !== action.payload),
                error: undefined
            }
        });

        builder.addCase(campiAction.deleteById.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });

        builder.addCase(campiAction.aggiungiCampo.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            }
        });

        builder.addCase(campiAction.aggiungiCampo.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                campi: [...state.campi, action.payload],
                error: undefined
            }
        });

        builder.addCase(campiAction.aggiungiCampo.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });
    })
};
