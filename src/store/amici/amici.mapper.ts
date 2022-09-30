import {SelectItem} from 'shared/components/selectData/selectData.component';
import {ResponseAmiciziaDto} from 'models/amici';

const getSelectItems = (amici: ResponseAmiciziaDto[]): SelectItem[] => {
    return amici.map((amico) => ({
        value: amico.cognomeAmico + ' ' + amico.nomeAmico,
        id: amico.idAmico,
    }));
}

export const amiciMapper = {
    getSelectItems
}