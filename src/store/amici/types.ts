import {ResponseAmiciziaDto} from 'models/amici';

export interface AmiciState {
    amici: ResponseAmiciziaDto[];
    availableAmici: ResponseAmiciziaDto[];
    richiesteInAttesa: ResponseAmiciziaDto[];
    isLoading: boolean;
    error?: string;
}
