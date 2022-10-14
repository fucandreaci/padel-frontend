import {RootState} from '../reducer.config';

const getAmici = (state: RootState) => state.amici.amici;
const getAvailableAmici = (state: RootState) => state.amici.availableAmici;
const getRichiesteInAttesa = (state: RootState) => state.amici.richiesteInAttesa;
const getError = (state: RootState) => state.amici.error;
const isLoading = (state: RootState) => state.amici.isLoading;

export const amiciSelector = {
    getAmici,
    getAvailableAmici,
    getRichiesteInAttesa,
    getError,
    isLoading
}
