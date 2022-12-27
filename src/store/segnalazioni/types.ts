import {ResponseSegnalazioneDto} from 'models/segnalazioni';

export interface SegnalazioniState {
    segnalazioni: ResponseSegnalazioneDto[];
    isLoading: boolean;
    error?: string;
}
