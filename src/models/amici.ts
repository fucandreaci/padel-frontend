export interface ResponseAmiciziaDto {
    idAmico: number,
    nomeAmico: string,
    cognomeAmico: string,
    accettata: boolean
}

export interface RequestAmiciziaDto {
    idUtente: number,
}

export interface RequestConfermaAmiciziaDto {
    idAmico: number,
    conferma: boolean
}