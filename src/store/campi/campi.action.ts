import {createAsyncThunk} from '@reduxjs/toolkit';
import {utility} from 'utils/utility';
import {campiService} from 'api/campi.service';
import {RootState} from '../reducer.config';
import {RequestCampoDto} from 'models/campi';

export const enum CAMPI_ACTION {
    FETCH_CAMPI = 'FETCH_CAMPI',
    DELETE_CAMPO = 'DELETE_CAMPO',
    ADD_CAMPO = 'ADD_CAMPO',
}

const getAll = createAsyncThunk(CAMPI_ACTION.FETCH_CAMPI, async () => {
        try {
            const response = await campiService.getAll()
            return response.data;
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    },
    {
        condition: (arg, api) => {
            const {campi} = api.getState() as RootState;
            return campi.campi.length === 0;
        }
    });

const deleteById = createAsyncThunk(CAMPI_ACTION.DELETE_CAMPO, async (id: number) => {
    try {
        await campiService.deleteById(id);
        return id;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

const aggiungiCampo = createAsyncThunk(CAMPI_ACTION.ADD_CAMPO, async (dto: RequestCampoDto) => {
    try {
        const response = await campiService.aggiungiCampo(dto);
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

export const campiAction = {
    getAll,
    deleteById,
    aggiungiCampo,
}