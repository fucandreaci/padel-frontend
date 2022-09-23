import {InfoVarie} from 'models/informazioni';

export interface NewsState {
    news: InfoVarie[];
    isLoading: boolean;
    error?: string;
}
