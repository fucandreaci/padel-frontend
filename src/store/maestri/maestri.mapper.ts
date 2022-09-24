import {SelectItem} from 'shared/components/selectData/selectData.component';
import {ResponseMaestroDto} from 'models/maestri';

const getSelectItems = (maestri: ResponseMaestroDto[]): SelectItem[] => {
    return maestri.map((maestro) => ({
        value: maestro.nome + ' ' + maestro.cognome,
        id: maestro.id,
    }));
}

export const maestriMapper = {
    getSelectItems
}