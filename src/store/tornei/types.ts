import {ResponseTorneoDto} from 'models/tornei';

export interface TorneiState {
    tornei: ResponseTorneoDto[];
    isLoading: boolean;
    error?: string;
    errorIscrizione?: string;
}
