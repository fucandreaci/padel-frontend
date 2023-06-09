import {createReducer} from '@reduxjs/toolkit';
import { NewsState } from './types';
import {newsAction} from './news.action';

const initialState: NewsState = {
    news: [],
    isLoading: false,
};

export const newsReducer = {
    news:createReducer(initialState, (builder) => {
        builder.addCase(newsAction.fetchNews.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        });

        builder.addCase(newsAction.fetchNews.fulfilled, (state, action) => {
            return {
                ...state,
                news: action.payload,
                isLoading: false,
                error: undefined
            }
        });

        builder.addCase(newsAction.fetchNews.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message
            }
        });

        builder.addCase(newsAction.updateNews.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: undefined
            }
        });

        builder.addCase(newsAction.updateNews.fulfilled, (state, action) => {
            return {
                ...state,
                news: action.payload,
                isLoading: false,
                error: undefined
            }
        });

        builder.addCase(newsAction.updateNews.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message
            }
        });
    })
}
