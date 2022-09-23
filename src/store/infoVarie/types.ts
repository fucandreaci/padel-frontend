import {InfoVarie, OrariStruttura} from 'models/informazioni';

export interface InfoVarieState {
    infoVarie: InfoVarie[];
    regole: InfoVarie[];
    orariStruttura: OrariStruttura[];
    isLoading: boolean;
    error?: string;
}
