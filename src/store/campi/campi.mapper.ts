import {SelectItem} from 'shared/components/selectData/selectData.component';
import {ResponseCampoDto} from 'models/campi';

const getSelectItems = (campi: ResponseCampoDto[]): SelectItem[] => {
    return campi.map((campo) => ({
        value: campo.nome,
        id: campo.id,
    }));
}

export const campiMapper = {
    getSelectItems
}