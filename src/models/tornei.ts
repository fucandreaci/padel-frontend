export interface ResponseTorneoDto {
    id: number,
    maxPartecipanti: number,
    numPartecipanti: number,
    prenotazioneAperta: boolean,
    utentePrenotato: boolean,
    descrizione: string,
}

export interface RequestIscrizioneTorneoDto {
    idTorneo: number;
}