import {UtenteDto} from './utente';

export interface Messaggio {
    id: string;
    sender: UtenteDto;
    receiver: UtenteDto;
    message: string;
    time: Date;
}

export interface MessaggioOrdinato {
    user: UtenteDto;
    messages: { msg: string, id: string }[];
    time: Date;
}

export interface InviaMessaggioDto {
    idDestinatario: number;
    messaggio: string;
}