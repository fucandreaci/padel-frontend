import {RootState} from '../reducer.config';

const getTornei = (state: RootState) => state.tornei.tornei;
const getError = (state: RootState) => state.tornei.error;
const getErrorIscrizione = (state: RootState) => state.tornei.errorIscrizione;
const isLoading = (state: RootState) => state.tornei.isLoading;

export const torneiSelector = {
    getTornei,
    getError,
    getErrorIscrizione,
    isLoading
}
