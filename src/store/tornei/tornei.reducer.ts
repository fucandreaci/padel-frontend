import {createReducer} from '@reduxjs/toolkit';
import { TorneiState } from './types';
import {torneiAction} from './tornei.action';
import {ResponseTorneoDto} from 'models/tornei';

const initialState: TorneiState = {
    tornei: [],
    isLoading: false,
};

export const torneiReducer = {
    tornei: createReducer(initialState, (builder) => {
        builder.addCase(torneiAction.fetchTornei.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        });

        builder.addCase(torneiAction.fetchTornei.fulfilled, (state, action) => {
            return {
                ...state,
                tornei: action.payload,
                isLoading: false,
                error: undefined
            }
        });

        builder.addCase(torneiAction.fetchTornei.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message
            }
        });

        builder.addCase(torneiAction.iscriviUtente.pending, (state, action) => {
            return {
                ...state,
                errorIscrizione: undefined
            }
        });

        builder.addCase(torneiAction.iscriviUtente.fulfilled, (state, action) => {
            const tornei: ResponseTorneoDto[] = state.tornei.map(t => {
                if (t.id === action.payload.idTorneo) {
                    return {
                        ...t,
                        utentePrenotato: true,
                        numPartecipanti: t.numPartecipanti + 1
                    }
                }
                return t;
            });

            return {
                ...state,
                tornei,
                isLoading: false,
                errorIscrizione: undefined
            }
        });

        builder.addCase(torneiAction.iscriviUtente.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                errorIscrizione: action.error.message
            }
        });

        builder.addCase(torneiAction.rimuoviUtente.fulfilled, (state, action) => {
            const tornei: ResponseTorneoDto[] = state.tornei.map(t => {
                if (t.id === action.payload.idTorneo) {
                    return {
                        ...t,
                        utentePrenotato: false,
                        numPartecipanti: t.numPartecipanti - 1
                    }
                }
                return t;
            });
            return {
                ...state,
                tornei,
                isLoading: false,
                errorIscrizione: undefined
            }
        });

        builder.addCase(torneiAction.rimuoviUtente.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                errorIscrizione: action.error.message
            }
        });

        builder.addDefaultCase((state, action) => {
            return state;
        });
    })
}