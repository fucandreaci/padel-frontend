import React, {useEffect} from 'react';
import './selectCampi.scss'
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {ResponseCampoDto} from 'models/campi';
import {useSelector} from 'react-redux';
import {campiSelector} from 'store/campi/campi.selector';
import {useAppDispatch} from 'store/store.config';
import {campiAction} from 'store/campi/campi.action';

interface SelectCampiProps {
    selectedCampo?: ResponseCampoDto,
    setSelectedCampo: (campo?: ResponseCampoDto) => void,
}

const componentClassName = 'select-campi';

export const SelectCampi = (props: SelectCampiProps) => {
    const dispatch = useAppDispatch();
    const campi: ResponseCampoDto[] = useSelector(campiSelector.getCampi)

    useEffect(() => {
        dispatch(campiAction.getAll());
    }, []);

    const handleOnChange = (event: SelectChangeEvent<number>) => {
        const selectedCampo = campi.find(campo => campo.id === event.target.value);
        props.setSelectedCampo(selectedCampo);
    }

    return (
        <div className={`${componentClassName}`}>
            <FormControl margin={'dense'} fullWidth>
                <InputLabel id="campi-select-label">Seleziona un campo</InputLabel>
                <Select
                    labelId="campi-select-label"
                    id="demo-simple-select"
                    value={props.selectedCampo?.id || ''}
                    label="Seleziona un campo"
                    onChange={handleOnChange}
                >
                    <MenuItem selected={!props.selectedCampo} disabled={true}>Seleziona campo</MenuItem>
                    {
                        campi.map(campo => (
                            <MenuItem key={campo.id} value={campo.id}>{campo.nome}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
};
