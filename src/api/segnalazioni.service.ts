import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {
    RequestGestioneSegnalazioneDto,
    RequestInviaSegnalazioneDto,
    ResponseSegnalazioneDto
} from 'models/segnalazioni';

const inviaSegnalazione = (dto: RequestInviaSegnalazioneDto): Promise<AxiosResponse<void>> => {
    return axios.post("/segnalazioni", dto, tokenUtils.getHeader());
}

const getSegnalazioniNonGestite = (): Promise<AxiosResponse<ResponseSegnalazioneDto[]>> => {
    return axios.get("/segnalazioni", tokenUtils.getHeader());
}

const gestisciSegnalazione = (dto: RequestGestioneSegnalazioneDto): Promise<AxiosResponse<void>> => {
    return axios.post("/segnalazioni/gestisci", dto, tokenUtils.getHeader());
}

export const segnalazioniService = {
    inviaSegnalazione,
    getSegnalazioniNonGestite,
    gestisciSegnalazione
}