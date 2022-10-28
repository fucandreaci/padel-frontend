import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {RequestCampoDto, ResponseCampoDto} from 'models/campi';

const getAll = (): Promise<AxiosResponse<ResponseCampoDto[]>> => {
    return axios.get("/campi", tokenUtils.getHeader());
}

const deleteById = (id: number): Promise<AxiosResponse<void>> => {
    return axios.delete(`/campi/${id}`, tokenUtils.getHeader());
}

const aggiungiCampo = (dto: RequestCampoDto): Promise<AxiosResponse<ResponseCampoDto>> => {
    return axios.post("/campi", dto, tokenUtils.getHeader());
}

export const campiService = {
    getAll,
    deleteById,
    aggiungiCampo,
}