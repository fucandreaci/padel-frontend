import {RequestPrenotazioneDto} from './prenotazioni';

export interface ResponseLezionePrivataDto {
    nomeMaestro: string,
    cognomeMaestro: string,
    idMaestro: number
}

export interface RequestLezionePrivataDto extends RequestPrenotazioneDto {
    idMaestro: number
}