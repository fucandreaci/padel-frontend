import {createAsyncThunk} from '@reduxjs/toolkit';
import {informazioniService} from 'api/informazioni.service';
import {utility} from 'utils/utility';

export const enum CONTATTI_ACTION {
    'FETCH_CONTATTI' = 'FETCH_CONTATTI',
}

const fetchContatti = createAsyncThunk(CONTATTI_ACTION.FETCH_CONTATTI, async () => {
    try {
        const response = await informazioniService.getContatti()
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

export const contattiAction = {
    fetchContatti
}
