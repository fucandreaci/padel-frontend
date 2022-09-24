import {createAsyncThunk} from '@reduxjs/toolkit';
import {maestriService} from 'api/maestri.service';
import {utility} from 'utils/utility';
import {RootState} from '../reducer.config';

export const enum MAESTRI_ACTION {
    FETCH_MAESTRI = 'FETCH_MAESTRI',
}

const fetchMaestri = createAsyncThunk(MAESTRI_ACTION.FETCH_MAESTRI, async () => {
        try {
            const response = await maestriService.getMaestri();
            return response.data;
        } catch (e) {
            const msg = utility.getErrorMessage(e);
            throw new Error(msg);
        }
    },
    {
        condition: (arg, api) => {
            const {maestri} = api.getState() as RootState;
            return maestri.maestri.length === 0;
        }
    });

export const maestriAction = {
    fetchMaestri
}
