export interface Coupon {
    id: number
    codice: string
    valore: number
    tipo: TipoCoupon
}

export enum TipoCoupon {
    PERCENTUALE= 'PERCENTUALE',
    EURO = 'EURO'
}

export interface RequestGenerateCouponDto {
    tipo: TipoCoupon,
    valore: number,
}