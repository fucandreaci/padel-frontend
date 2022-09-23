import {RootState} from '../reducer.config';

const getPrenotazioni = (state: RootState) => state.prenotazioni.prenotazioni;
const getError = (state: RootState) => state.prenotazioni.error;
const isLoading = (state: RootState) => state.prenotazioni.isLoading;

export const prenotazioniSelector = {
    getPrenotazioni,
    getError,
    isLoading
}
