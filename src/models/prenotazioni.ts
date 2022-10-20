import {Campo} from './campi';
import {ResponsePartitaDto} from './partite';
import {ResponseLezionePrivataDto} from './lezioniPrivate';
import {Coupon} from './coupon';

export interface ResponsePrenotazioneWithTypeDto extends ResponsePrenotazioneDto{
    id: number;
    type: PrenotazioneType,
    partite: ResponsePartitaDto,
    lezioniPrivate: ResponseLezionePrivataDto
    coupon?: Coupon
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

export interface RequestPrenotazioneDto {
    idCampo: number,
    da: Date,
    a: Date,
    codiceCoupon: string
}