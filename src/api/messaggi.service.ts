import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {InviaMessaggioDto} from 'models/messaggi';

const inviaMessaggio = (dto: InviaMessaggioDto): Promise<AxiosResponse> => {
    return axios.post("/messaggi/invia", dto, tokenUtils.getHeader());
}

export const messaggiService = {
    inviaMessaggio
}