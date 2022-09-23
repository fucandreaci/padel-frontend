import {createAsyncThunk} from '@reduxjs/toolkit';
import {informazioniService} from 'api/informazioni.service';
import {utility} from 'utils/utility';

export const enum INFO_VARIE_ACTION {
    'FETCH_INFO_VARIE' = 'FETCH_INFO_VARIE',
}

const fetchInfoVarie = createAsyncThunk(INFO_VARIE_ACTION.FETCH_INFO_VARIE, async () => {
    try {
        const responseInfo = await informazioniService.getInfoVarie()
        const responseOrari = await informazioniService.getOrariStruttura()
        const responseRegole = await informazioniService.getRegole()

        return {
            infoVarie: responseInfo.data,
            orariStruttura: responseOrari.data,
            regole: responseRegole.data
        }

    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

export const infoVarieAction = {
    fetchInfoVarie
}