import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {
    RequestCreaTorneoDto,
    RequestIscrizioneTorneoDto,
    RequestModificaTorneoDto,
    ResponseTorneoDto
} from 'models/tornei';

const fetchAll = (): Promise<AxiosResponse<ResponseTorneoDto[]>> => {
    return axios.get("/tornei", tokenUtils.getHeader());
}

const iscriviUtente = (dto: RequestIscrizioneTorneoDto): Promise<AxiosResponse<void>> => {
    return axios.post("/tornei/iscriviti", dto, tokenUtils.getHeader());
}

const rimuoviIscrizione = (dto: RequestIscrizioneTorneoDto): Promise<AxiosResponse<void>> => {
    return axios.post("/tornei/rimuoviIscrizione", dto, tokenUtils.getHeader());
}

const createTorneo = (dto: RequestCreaTorneoDto): Promise<AxiosResponse<ResponseTorneoDto>> => {
    return axios.post("/tornei", dto, tokenUtils.getHeader());
}

const modificaTorneo = (dto: RequestModificaTorneoDto, id: number): Promise<AxiosResponse<ResponseTorneoDto>> => {
    return axios.put(`/tornei/${id}`, dto, tokenUtils.getHeader());
}

const deleteTorneo = (id: number): Promise<AxiosResponse<void>> => {
    return axios.delete(`/tornei/${id}`, tokenUtils.getHeader());
}
export const torneiService = {
    fetchAll,
    iscriviUtente,
    rimuoviIscrizione,
    createTorneo,
    modificaTorneo,
    deleteTorneo
}