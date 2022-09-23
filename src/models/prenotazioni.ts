import {Campo} from './campi';
import {ResponsePartitaDto} from './partite';
import {ResponseLezionePrivataDto} from './lezioniPrivate';

export interface ResponsePrenotazioneWithTypeDto extends ResponsePrenotazioneDto{
    id: number;
    type: PrenotazioneType,
    partite: ResponsePartitaDto,
    lezioniPrivate: ResponseLezionePrivataDto
}

export interface ResponsePrenotazioneDto {
    campo: Campo,
    da: Date,
    a: Date,
}

export enum PrenotazioneType {
    LEZIONE_PRIVATA = 'LEZIONE_PRIVATA',
    PARTITA = 'PARTITA',
}