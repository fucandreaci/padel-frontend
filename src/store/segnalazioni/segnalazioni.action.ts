import {createAsyncThunk} from '@reduxjs/toolkit';
import {segnalazioniService} from 'api/segnalazioni.service';
import {utility} from 'utils/utility';
import {RequestGestioneSegnalazioneDto} from 'models/segnalazioni';

export const enum SEGNALAZIONI_ACTION {
    FETCH_SEGNALAZIONI_NON_GESTITE = 'FETCH_SEGNALAZIONI_NON_GESTITE',
    GESTISCI_SEGNALAZIONE = 'GESTISCI_SEGNALAZIONE',
}

export const fetchSegnalazioniNonGestite = createAsyncThunk(SEGNALAZIONI_ACTION.FETCH_SEGNALAZIONI_NON_GESTITE, async () => {
    try {
        const response = await segnalazioniService.getSegnalazioniNonGestite();
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

export const gestisciSegnalazione = createAsyncThunk(SEGNALAZIONI_ACTION.GESTISCI_SEGNALAZIONE, async (dto: RequestGestioneSegnalazioneDto) => {
    try {
        await segnalazioniService.gestisciSegnalazione(dto);
        return dto;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

export const segnalazioniAction = {
    fetchSegnalazioniNonGestite,
    gestisciSegnalazione
}
