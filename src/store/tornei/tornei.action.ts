import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {utility} from 'utils/utility';
import {RootState} from '../reducer.config';
import {torneiService} from 'api/tornei.service';
import {RequestCreaTorneoDto, RequestIscrizioneTorneoDto, RequestModificaTorneoDto} from 'models/tornei';

export const enum TORNEI_ACTION {
    GET_TORNEI = 'GET_TORNEI',
    ISCRIVI_UTENTE = 'ISCRIVI_UTENTE',
    RIMUOVI_ISCRIZIONE = 'RIMUOVI_ISCRIZIONE',
    CREATE_TORNEO = 'CREATE_TORNEO',
    MODIFICA_TORNEO = 'MODIFICA_TORNEO',
    ELIMINA_TORNEO = 'ELIMINA_TORNEO',
    RESET_ERROR = 'RESET_ERROR',
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

const modificaTorneo = createAsyncThunk(TORNEI_ACTION.MODIFICA_TORNEO,
    async ({dto, id}: {
        dto: RequestModificaTorneoDto,
        id: number
    }) => {
        try {
            const response = await torneiService.modificaTorneo(dto, id)
            return response.data
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    }
);

const eliminaTorneo = createAsyncThunk(TORNEI_ACTION.ELIMINA_TORNEO, async (id: number) => {
        try {
            await torneiService.deleteTorneo(id)
            return id
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    }
);

const createTorneo = createAsyncThunk(TORNEI_ACTION.CREATE_TORNEO, async (dto: RequestCreaTorneoDto) => {
        try {
            const response = await torneiService.createTorneo(dto)
            return response.data
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    }
);

const resetError = createAction(TORNEI_ACTION.RESET_ERROR);

export const torneiAction = {
    fetchTornei,
    iscriviUtente,
    rimuoviUtente,
    createTorneo,
    modificaTorneo,
    eliminaTorneo,
    resetError,
}