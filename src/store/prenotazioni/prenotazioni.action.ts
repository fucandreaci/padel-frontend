import {createAsyncThunk} from '@reduxjs/toolkit';
import {prenotazioniService} from 'api/prenotazioni.service';
import {utility} from 'utils/utility';
import {RootState} from '../reducer.config';
import {RequestLezionePrivataDto} from 'models/lezioniPrivate';
import {RequestPrenotazioneDto} from 'models/prenotazioni';

export const enum PRENOTAZIONI_ACTION {
    FETCH_PRENOTAZIONI = 'FETCH_PRENOTAZIONI',
    INSERT_LEZIONE_PRIVATA = 'INSERT_LEZIONE_PRIVATA',
    INSERT_PARTITA = 'INSERT_PARTITA',
}

const fetchMyPrenotazioni = createAsyncThunk(PRENOTAZIONI_ACTION.FETCH_PRENOTAZIONI, async () => {
        try {
            const response = await prenotazioniService.getMyPrenotazioni()
            return response.data;
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    },
    {
        condition: (arg, api) => {
            const {prenotazioni} = api.getState() as RootState;
            return prenotazioni.prenotazioni.length === 0;
        }
    }
);

const insertLezionePrivata = createAsyncThunk(PRENOTAZIONI_ACTION.INSERT_LEZIONE_PRIVATA, async (lezionePrivata: RequestLezionePrivataDto) => {
    try {
        const response = await prenotazioniService.insertLezionePrivata(lezionePrivata);
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

const insertPartita = createAsyncThunk(PRENOTAZIONI_ACTION.INSERT_PARTITA, async (partita: RequestPrenotazioneDto) => {
    try {
        const response = await prenotazioniService.insertPartita(partita);
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

export const prenotazioniAction = {
    fetchMyPrenotazioni,
    insertLezionePrivata,
    insertPartita
}