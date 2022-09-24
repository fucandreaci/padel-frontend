import React, {useState} from 'react';
import './addPrenotazione.scss'
import {Dialog, DialogContent, DialogTitle, Stack} from '@mui/material';
import {SelectCampi} from './components/selectCampi/selectCampi.component';
import {ResponseCampoDto} from 'models/campi';
import {DateTimePickerPrenotazione} from './components/dateTimePickerPrenotazione/dateTimePickerPrenotazione.component';
import dayjs, {Dayjs} from 'dayjs';
import {DateTimeValidationError} from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';

interface AddPrenotazioneProps{
    open: boolean,
    setOpen: (open: boolean) => void
}

const componentClassName = 'add-prenotazione';

export const AddPrenotazione = (props: AddPrenotazioneProps) => {
    const [selectedCampo, setSelectedCampo] = useState<ResponseCampoDto | undefined>();
    const [da, setDa] = useState<Dayjs|null>(null);
    const [a, setA] = useState<Dayjs|null>(null);

    const log = (reason: DateTimeValidationError, value: Dayjs | null) => {
        console.log(reason, value);
    }

    const now: Dayjs = dayjs();

    return (
    <div className={`${componentClassName}`}>
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={props.open}
            onClose={() => props.setOpen(false)}
        >
            <DialogTitle>Prenota una partita</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <SelectCampi setSelectedCampo={setSelectedCampo} selectedCampo={selectedCampo} />

                    <Stack direction={'row'} spacing={2}>
                        <DateTimePickerPrenotazione value={da} setValue={setDa} label={'Da'} minDate={now} onError={log}/>
                        <DateTimePickerPrenotazione value={a} setValue={setA} label={'A'} minDate={da != null ? da : undefined} onError={log}/>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    </div>
    )
};
