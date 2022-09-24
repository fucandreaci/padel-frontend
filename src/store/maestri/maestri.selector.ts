import {RootState} from '../reducer.config';

const getMaestri = (state: RootState) => state.maestri.maestri;
const getError = (state: RootState) => state.maestri.error;
const isLoading = (state: RootState) => state.maestri.isLoading;

export const maestriSelector = {
    getMaestri,
    getError,
    isLoading
}
