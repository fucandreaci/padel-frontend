import {createAsyncThunk} from '@reduxjs/toolkit';
import {utility} from 'utils/utility';
import {RootState} from '../reducer.config';
import {amiciService} from 'api/amici.service';
import {RequestAmiciziaDto, RequestConfermaAmiciziaDto} from 'models/amici';

export const enum AMICI_ACTION {
    FETCH_AMICI = 'FETCH_AMICI',
    FETCH_AVAILABLE_AMICI = 'FETCH_AVAILABLE_AMICI',
    FETCH_RICHIESTE_IN_ATTESA = 'FETCH_RICHIESTE_IN_ATTESA',
    SEND_RICHIESTA_AMICIZIA = 'SEND_RICHIESTA_AMICIZIA',
    CONFERMA_RICHIESTA_AMICIZIA = 'CONFERMA_RICHIESTA_AMICIZIA',
}

const fetchAmici = createAsyncThunk(AMICI_ACTION.FETCH_AMICI, async () => {
        try {
            const response = await amiciService.getAmici();
            return response.data;
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    },
    {
        condition: (arg, api) => {
            const {amici} = api.getState() as RootState;
            return amici.amici.length === 0;
        }
    });

const fetchAvailableAmici = createAsyncThunk(AMICI_ACTION.FETCH_AVAILABLE_AMICI, async () => {
        try {
            const response = await amiciService.getAvailableAmici();
            return response.data;
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    },
    {
        condition: (arg, api) => {
            const {amici} = api.getState() as RootState;
            return amici.availableAmici.length === 0;
        }
    });

const fetchRichiesteInSospeso = createAsyncThunk(AMICI_ACTION.FETCH_RICHIESTE_IN_ATTESA, async () => {
        try {
            const response = await amiciService.getRichiesteInSospeso();
            return response.data;
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    },
    {
        condition: (arg, api) => {
            const {amici} = api.getState() as RootState;
            return amici.richiesteInAttesa.length === 0;
        }
    });

const inviaRichiesta = createAsyncThunk(AMICI_ACTION.SEND_RICHIESTA_AMICIZIA, async (dto: RequestAmiciziaDto) => {
    try {
        const response = await amiciService.inviaRichiesta(dto);
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

const confermaRichiesta = createAsyncThunk(AMICI_ACTION.CONFERMA_RICHIESTA_AMICIZIA, async (dto: RequestConfermaAmiciziaDto) => {
    try {
        const response = await amiciService.confermaRichiesta(dto);
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

export const amiciAction = {
    fetchAmici,
    fetchAvailableAmici,
    fetchRichiesteInSospeso,
    inviaRichiesta,
    confermaRichiesta
}