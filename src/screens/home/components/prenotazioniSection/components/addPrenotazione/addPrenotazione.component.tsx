import React, {useEffect, useState} from 'react';
import './addPrenotazione.scss'
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Stack
} from '@mui/material';
import {ResponseCampoDto} from 'models/campi';
import {DateTimePickerPrenotazione} from './components/dateTimePickerPrenotazione/dateTimePickerPrenotazione.component';
import dayjs, {Dayjs} from 'dayjs';
import {DateTimeValidationError} from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import {SelectData, SelectItem} from 'shared/components/selectData/selectData.component';
import {useAppDispatch} from 'store/store.config';
import {campiAction} from 'store/campi/campi.action';
import {campiSelector} from 'store/campi/campi.selector';
import {useSelector} from 'react-redux';
import {campiMapper} from 'store/campi/campi.mapper';
import {maestriAction} from 'store/maestri/maestri.action';
import {ResponseMaestroDto} from 'models/maestri';
import {maestriSelector} from 'store/maestri/maestri.selector';
import {maestriMapper} from 'store/maestri/maestri.mapper';

interface AddPrenotazioneProps{
    open: boolean,
    setOpen: (open: boolean) => void
}

const componentClassName = 'add-prenotazione';

export const AddPrenotazione = (props: AddPrenotazioneProps) => {
    const dispatch = useAppDispatch();
    
    const [selectedCampo, setSelectedCampo] = useState<SelectItem | undefined>();
    const [selectedMaestro, setSelectedMaestro] = useState<SelectItem | undefined>();
    const [da, setDa] = useState<Dayjs|null>(null);
    const [a, setA] = useState<Dayjs|null>(null);
    const [isLezionePrivata, setIsLezionePrivata] = useState<boolean>(false);

    const campi: ResponseCampoDto[] = useSelector(campiSelector.getCampi)
    const maestri: ResponseMaestroDto[] = useSelector(maestriSelector.getMaestri)

    const now: Dayjs = dayjs();

    useEffect(() => {
        dispatch(campiAction.getAll());
    }, []);

    useEffect(() => {
        dispatch(maestriAction.fetchMaestri());
    }, []);

    const createPrenotazione = () => {};

    return (
    <div className={`${componentClassName}`}>
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={props.open}
            onClose={() => props.setOpen(false)}
        >
            <DialogTitle>{isLezionePrivata ? 'Prenota una lezione privata' : 'Prenota una partita'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <SelectData
                        setSelectedItem={setSelectedCampo}
                        selectedItem={selectedCampo}
                        items={campiMapper.getSelectItems(campi)}
                        label={'Seleziona un campo'}
                        id={'campo-select'}
                    />

                    <Stack direction={'row'} spacing={2}>
                        <DateTimePickerPrenotazione value={da} setValue={setDa} label={'Da'} minDate={now} onError={() => {}}/>
                        <DateTimePickerPrenotazione value={a} setValue={setA} label={'A'} minDate={da != null ? da : undefined} onError={() => {}}/>
                    </Stack>

                    <FormControlLabel control={<Checkbox checked={isLezionePrivata} onChange={(_, checked) => setIsLezionePrivata(checked)}/>} label="Voglio un maestro privato" />

                    {
                        isLezionePrivata && (
                            <SelectData
                                setSelectedItem={setSelectedMaestro}
                                selectedItem={selectedMaestro}
                                items={maestriMapper.getSelectItems(maestri)}
                                label={'Seleziona un maestro'}
                                id={'maestro-select'}
                            />
                        )
                    }
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Chiudi</Button>
                <Button onClick={createPrenotazione} variant={'contained'}>{isLezionePrivata ? 'Prenota lezione privata' : 'Prenota partita'}</Button>
            </DialogActions>
        </Dialog>
    </div>
    )
};
