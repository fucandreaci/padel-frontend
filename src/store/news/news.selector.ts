import {RootState} from '../reducer.config';

const getNews = (state: RootState) => state.news.news;
const getError = (state: RootState) => state.news.error;
const isLoading = (state: RootState) => state.news.isLoading;

export const newsSelector = {
    getNews,
    getError,
    isLoading
}
