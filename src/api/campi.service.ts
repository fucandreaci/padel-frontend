import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {ResponseCampoDto} from 'models/campi';

const getAll = (): Promise<AxiosResponse<ResponseCampoDto[]>> => {
    return axios.get("/campi", tokenUtils.getHeader());
}

export const campiService = {
    getAll
}