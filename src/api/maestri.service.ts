import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {ResponseMaestroDto} from 'models/maestri';

const getMaestri = (): Promise<AxiosResponse<ResponseMaestroDto[]>> => {
    return axios.get("/maestri", tokenUtils.getHeader());
}

export const maestriService = {
    getMaestri
}