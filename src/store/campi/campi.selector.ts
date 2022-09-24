import {RootState} from '../reducer.config';

const getCampi = (state: RootState) => state.campi.campi;
const getError = (state: RootState) => state.campi.error;
const isLoading = (state: RootState) => state.campi.isLoading;

export const campiSelector = {
    getCampi,
    getError,
    isLoading
}
