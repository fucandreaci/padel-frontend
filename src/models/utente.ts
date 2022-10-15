interface NomeCognome {
    nome: string,
    cognome: string,
}

export interface RequestLoginDto {
    email: string;
    password: string;
}

export interface ResponseLoginDto {
    token: string;
    ruolo: Ruolo,
    id: number
}

export interface RequestSignupDto extends RequestLoginDto, NomeCognome {
}

export interface ResponseSignupDto extends NomeCognome{
    email: string;
}

export enum Ruolo {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface UtenteDto {
    id: number;
    nome: string;
    cognome: string;
}