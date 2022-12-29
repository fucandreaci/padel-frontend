import {ResponsePrenotazioneDto} from './prenotazioni';

export interface Coupon {
    id: number
    codice: string
    valore: number
    tipo: TipoCoupon
    prenotazione: ResponsePrenotazioneDto
}
export interface RequestGenerateCouponDto {
    tipo: TipoCoupon,
    valore: number,
}

export interface ResponseCouponDto {
    id: number;
    codice: string;
    valore: number;
    tipo: TipoCoupon;
    utilizzato: boolean;
}


export enum TipoCoupon {
    PERCENTUALE= 'PERCENTUALE',
    EURO = 'EURO'
}

