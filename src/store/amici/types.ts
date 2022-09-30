import {ResponseAmiciziaDto} from 'models/amici';

export interface AmiciState {
    amici: ResponseAmiciziaDto[];
    availableAmici: ResponseAmiciziaDto[];
    isLoading: boolean;
    error?: string;
}
