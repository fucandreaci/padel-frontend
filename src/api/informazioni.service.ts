import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {InfoVarie} from 'models/informazioni';

const getNews = (): Promise<AxiosResponse<InfoVarie[]>> => {
    return axios.get("/informazioni/getNews", tokenUtils.getHeader());
}

const getInfoVarie = (): Promise<AxiosResponse<InfoVarie[]>> => {
    return axios.get("/informazioni/getInfoVarie", tokenUtils.getHeader());
}

const getContatti = (): Promise<AxiosResponse<InfoVarie[]>> => {
    return axios.get("/informazioni/getContatti", tokenUtils.getHeader());
}

export const informazioniService = {
    getNews,
    getInfoVarie,
    getContatti
}