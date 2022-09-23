import {createAsyncThunk} from '@reduxjs/toolkit';
import {informazioniService} from 'api/informazioni.service';

export const enum INFO_VARIE_ACTION {
    'FETCH_INFO_VARIE' = 'FETCH_INFO_VARIE',
}

const fetchInfoVarie = createAsyncThunk(INFO_VARIE_ACTION.FETCH_INFO_VARIE, async () => {
    try {
        const response = await informazioniService.getInfoVarie()
        return response.data;
    } catch (e) {
        console.log(e)
        throw e;
    }
});

export const infoVarieAction = {
    fetchInfoVarie
}