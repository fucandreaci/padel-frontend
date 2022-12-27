import {createReducer} from '@reduxjs/toolkit';
import { SegnalazioniState } from './types';
import {segnalazioniAction} from './segnalazioni.action';

const initialState: SegnalazioniState = {
    segnalazioni: [],
    isLoading: false,
};

export const segnalazioniReducer = {
    segnalazioni: createReducer(initialState, (builder) => {
        builder.addCase(segnalazioniAction.fetchSegnalazioniNonGestite.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: undefined
            }
        });

        builder.addCase(segnalazioniAction.fetchSegnalazioniNonGestite.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                segnalazioni: action.payload,
                error: undefined
            }
        });

        builder.addCase(segnalazioniAction.fetchSegnalazioniNonGestite.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });

        builder.addCase(segnalazioniAction.gestisciSegnalazione.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: undefined
            }
        });

        builder.addCase(segnalazioniAction.gestisciSegnalazione.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: undefined,
                segnalazioni: state.segnalazioni.filter(s => s.id !== action.payload.id)
            }
        });

        builder.addCase(segnalazioniAction.gestisciSegnalazione.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });
    })
}