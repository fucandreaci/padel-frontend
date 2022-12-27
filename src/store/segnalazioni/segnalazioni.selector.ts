import {RootState} from '../reducer.config';

const getSegnalazioni = (state: RootState) => state.segnalazioni.segnalazioni;
const getError = (state: RootState) => state.segnalazioni.error;
const isLoading = (state: RootState) => state.segnalazioni.isLoading;

export const segnalazioniSelector = {
    getSegnalazioni,
    getError,
    isLoading
}
