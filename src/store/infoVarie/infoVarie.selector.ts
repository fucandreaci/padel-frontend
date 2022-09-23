import {RootState} from '../reducer.config';

const getInfoVarie = (state: RootState) => state.infoVarie.infoVarie;
const getOrariStruttura = (state: RootState) => state.infoVarie.orariStruttura;
const getError = (state: RootState) => state.infoVarie.error;
const isLoading = (state: RootState) => state.infoVarie.isLoading;

export const infoVarieSelector = {
    getInfoVarie,
    getOrariStruttura,
    getError,
    isLoading
}
