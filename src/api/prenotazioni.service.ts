import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {RequestPrenotazioneDto, ResponsePrenotazioneWithTypeDto} from 'models/prenotazioni';
import {RequestLezionePrivataDto} from 'models/lezioniPrivate';

const getMyPrenotazioni = (): Promise<AxiosResponse<ResponsePrenotazioneWithTypeDto[]>> => {
    return axios.get("/prenotazioni", tokenUtils.getHeader());
}

const insertLezionePrivata = (lezionePrivata: RequestLezionePrivataDto): Promise<AxiosResponse<ResponsePrenotazioneWithTypeDto>> => {
    return axios.post<ResponsePrenotazioneWithTypeDto>("/lezioniprivate", lezionePrivata, tokenUtils.getHeader());
}

const insertPartita = (partita: RequestPrenotazioneDto): Promise<AxiosResponse<ResponsePrenotazioneWithTypeDto>> => {
    return axios.post<ResponsePrenotazioneWithTypeDto>("/partite", partita, tokenUtils.getHeader());
}

export const prenotazioniService = {
    getMyPrenotazioni,
    insertLezionePrivata,
    insertPartita
}