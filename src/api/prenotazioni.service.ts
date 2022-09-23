import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {ResponsePrenotazioneWithTypeDto} from 'models/prenotazioni';

const getMyPrenotazioni = (): Promise<AxiosResponse<ResponsePrenotazioneWithTypeDto[]>> => {
    return axios.get("/prenotazioni", tokenUtils.getHeader());
}

export const prenotazioniService = {
    getMyPrenotazioni
}