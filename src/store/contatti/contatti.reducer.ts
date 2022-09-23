import {createReducer} from '@reduxjs/toolkit';
import { ContattiState } from './types';
import {contattiAction} from './contatti.action';

const initialState: ContattiState = {
    contatti: [],
    isLoading: false,
};

export const contattiReducer = {
    contatti: createReducer(initialState, (builder) => {
        builder.addCase(contattiAction.fetchContatti.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        });

        builder.addCase(contattiAction.fetchContatti.fulfilled, (state, action) => {
            return {
                ...state,
                contatti: action.payload,
                isLoading: false,
                error: undefined
            }
        });

        builder.addCase(contattiAction.fetchContatti.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message
            }
        });
    })
};
