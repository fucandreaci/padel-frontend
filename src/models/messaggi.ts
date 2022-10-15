import {UtenteDto} from './utente';

export interface Messaggio {
    sender: UtenteDto;
    receiver: UtenteDto;
    message: string;
    time: Date;
}

export interface MessaggioOrdinato {
    user: UtenteDto;
    messages: string[];
    time: Date;
}