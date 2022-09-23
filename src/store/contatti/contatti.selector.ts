import {RootState} from '../reducer.config';

const getContatti = (state: RootState) => state.contatti.contatti;
const getError = (state: RootState) => state.contatti.error;
const isLoading = (state: RootState) => state.contatti.isLoading;

export const contattiSelector = {
    getContatti,
    getError,
    isLoading
}
