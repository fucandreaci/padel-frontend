import {createAsyncThunk} from '@reduxjs/toolkit';
import {prenotazioniService} from 'api/prenotazioni.service';
import {utility} from 'utils/utility';
import {RootState} from '../reducer.config';

export const enum PRENOTAZIONI_ACTION {
    FETCH_PRENOTAZIONI = 'FETCH_PRENOTAZIONI',
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
    });

export const prenotazioniAction = {
    fetchMyPrenotazioni
}