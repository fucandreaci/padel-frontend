import axios, {AxiosResponse} from 'axios';
import {RequestAmiciziaDto, ResponseAmiciziaDto} from '../models/amici';
import {tokenUtils} from '../utils/token.utils';

const getAmici = (): Promise<AxiosResponse<ResponseAmiciziaDto[]>> => {
    return axios.get("/amici", tokenUtils.getHeader());
}

const getAvailableAmici = (): Promise<AxiosResponse<ResponseAmiciziaDto[]>> => {
    return axios.get("/amici/utentiDisponibili", tokenUtils.getHeader());
}

const inviaRichiesta = (dto: RequestAmiciziaDto): Promise<AxiosResponse<ResponseAmiciziaDto>> => {
    return axios.post("/amici/invia", dto, tokenUtils.getHeader());
}

export const amiciService = {
    getAmici,
    getAvailableAmici,
    inviaRichiesta
}
