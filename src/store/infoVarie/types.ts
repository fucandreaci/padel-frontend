import {InfoVarie} from 'models/informazioni';

export interface InfoVarieState {
    infoVarie: InfoVarie[];
    isLoading: boolean;
    error?: string;
}
