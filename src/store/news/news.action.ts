import {createAsyncThunk} from '@reduxjs/toolkit';
import {informazioniService} from 'api/informazioni.service';

export const enum NEWS_ACTION {
    'FETCH_NEWS' = 'FETCH_NEWS',
}
const fetchNews = createAsyncThunk(NEWS_ACTION.FETCH_NEWS, async () => {
    try {
        const response = await informazioniService.getNews()
        return response.data;
    } catch (e) {
        console.log(e)
        throw e;
    }
});

export const newsAction = {
    fetchNews
}