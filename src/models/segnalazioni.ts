import {Messaggio} from './messaggi';

export interface RequestInviaSegnalazioneDto {
    idChat: string,
    idMessaggio: string,
}

export interface ResponseSegnalazioneDto {
    id: number,
    chatId: string,
    messaggioId: string,
    gestita: boolean,
    messaggi: Messaggio[],
}

export interface RequestGestioneSegnalazioneDto {
    id: number,
    blocco: boolean,
}

