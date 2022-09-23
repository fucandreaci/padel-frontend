import {InfoVarie} from 'models/informazioni';

export interface ContattiState {
    contatti: InfoVarie[];
    isLoading: boolean;
    error?: string;
}
