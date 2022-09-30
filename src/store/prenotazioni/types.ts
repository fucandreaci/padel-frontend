import {ResponsePrenotazioneWithTypeDto} from 'models/prenotazioni';

export interface PrenotazioniState {
    prenotazioni: ResponsePrenotazioneWithTypeDto[];
    isLoading: boolean;
    error?: string;
    errorInsert?: string;
}
