import {ResponseMaestroDto} from 'models/maestri';

export interface MaestriState {
    maestri: ResponseMaestroDto[];
    isLoading: boolean;
    error?: string;
}
