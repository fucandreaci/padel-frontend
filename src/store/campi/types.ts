import {ResponseCampoDto} from 'models/campi';

export interface CampiState {
    campi: ResponseCampoDto[];
    isLoading: boolean;
    error?: string;
}
