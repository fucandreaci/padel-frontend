import {createAsyncThunk} from '@reduxjs/toolkit';
import {informazioniService} from 'api/informazioni.service';
import {utility} from 'utils/utility';

export const enum NEWS_ACTION {
    'FETCH_NEWS' = 'FETCH_NEWS',
}
const fetchNews = createAsyncThunk(NEWS_ACTION.FETCH_NEWS, async () => {
    try {
        const response = await informazioniService.getNews()
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

export const newsAction = {
    fetchNews
}