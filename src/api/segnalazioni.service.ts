import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {RequestInviaSegnalazioneDto} from 'models/segnalazioni';

const inviaSegnalazione = (dto: RequestInviaSegnalazioneDto): Promise<AxiosResponse<void>> => {
    return axios.post("/segnalazioni", dto, tokenUtils.getHeader());
}

export const segnalazioniService = {
    inviaSegnalazione
}