import {createAsyncThunk} from '@reduxjs/toolkit';
import {utility} from 'utils/utility';
import {RootState} from '../reducer.config';
import {torneiService} from 'api/tornei.service';
import {RequestIscrizioneTorneoDto} from 'models/tornei';

export const enum TORNEI_ACTION {
    GET_TORNEI = 'GET_TORNEI',
    ISCRIVI_UTENTE = 'ISCRIVI_UTENTE',
    RIMUOVI_ISCRIZIONE = 'RIMUOVI_ISCRIZIONE'
}

const fetchTornei = createAsyncThunk(TORNEI_ACTION.GET_TORNEI, async () => {
        try {
            const response = await torneiService.fetchAll()
            return response.data;
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    },
    {
        condition: (arg, api) => {
            const {tornei} = api.getState() as RootState;
            return tornei.tornei.length === 0;
        }
    }
);

const iscriviUtente = createAsyncThunk(TORNEI_ACTION.ISCRIVI_UTENTE, async (dto: RequestIscrizioneTorneoDto) => {
        try {
            await torneiService.iscriviUtente(dto)
            return {
                idTorneo: dto.idTorneo,
            }
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    }
);

const rimuoviUtente = createAsyncThunk(TORNEI_ACTION.RIMUOVI_ISCRIZIONE, async (dto: RequestIscrizioneTorneoDto) => {
        try {
            await torneiService.rimuoviIscrizione(dto)
            return {
                idTorneo: dto.idTorneo,
            }
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    }
);

export const torneiAction = {
    fetchTornei,
    iscriviUtente,
    rimuoviUtente
}