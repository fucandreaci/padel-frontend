import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {RequestIscrizioneTorneoDto, ResponseTorneoDto} from '../models/tornei';

const fetchAll = (): Promise<AxiosResponse<ResponseTorneoDto[]>> => {
    return axios.get("/tornei", tokenUtils.getHeader());
}

const iscriviUtente = (dto: RequestIscrizioneTorneoDto): Promise<AxiosResponse<void>> => {
    return axios.post("/tornei/iscriviti", dto, tokenUtils.getHeader());
}

const rimuoviIscrizione = (dto: RequestIscrizioneTorneoDto): Promise<AxiosResponse<void>> => {
    return axios.post("/tornei/rimuoviIscrizione", dto, tokenUtils.getHeader());
}

export const torneiService = {
    fetchAll,
    iscriviUtente,
    rimuoviIscrizione
}