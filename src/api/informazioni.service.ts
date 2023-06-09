import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {InfoVarie, OrariStruttura} from 'models/informazioni';

const getNews = (): Promise<AxiosResponse<InfoVarie[]>> => {
    return axios.get("/informazioni/getNews", tokenUtils.getHeader());
}

const getInfoVarie = (): Promise<AxiosResponse<InfoVarie[]>> => {
    return axios.get("/informazioni/getInfoVarie", tokenUtils.getHeader());
}

const getContatti = (): Promise<AxiosResponse<InfoVarie[]>> => {
    return axios.get("/informazioni/getContatti", tokenUtils.getHeader());
}

const getOrariStruttura = (): Promise<AxiosResponse<OrariStruttura[]>> => {
    return axios.get("/informazioni/getOrari", tokenUtils.getHeader());
}

const getRegole = (): Promise<AxiosResponse<InfoVarie[]>> => {
    return axios.get("/informazioni/getRegole", tokenUtils.getHeader());
}

const updateNews = (news: string): Promise<AxiosResponse<InfoVarie[]>> => {
    return axios.put("/informazioni/news", {news}, tokenUtils.getHeader());
}

export const informazioniService = {
    getNews,
    getInfoVarie,
    getContatti,
    getOrariStruttura,
    getRegole,
    updateNews
}