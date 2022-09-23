import {createReducer} from '@reduxjs/toolkit';
import { PrenotazioniState } from './types';
import {prenotazioniAction} from './prenotazioni.action';

const initialState: PrenotazioniState = {
    prenotazioni: [],
    isLoading: false,
};

export const prenotazioniReducer = {
    prenotazioni: createReducer(initialState, (builder) => {
        builder.addCase(prenotazioniAction.fetchMyPrenotazioni.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        });

        builder.addCase(prenotazioniAction.fetchMyPrenotazioni.fulfilled, (state, action) => {
            return {
                ...state,
                prenotazioni: action.payload,
                isLoading: false,
                error: undefined
            }
        });

        builder.addCase(prenotazioniAction.fetchMyPrenotazioni.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message
            }
        });
    })
};
