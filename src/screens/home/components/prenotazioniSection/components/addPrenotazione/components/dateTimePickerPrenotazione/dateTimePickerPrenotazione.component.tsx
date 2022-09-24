import React from 'react';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {TextField} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import './dateTimePickerPrenotazione.scss'
import {DateTimeValidationError} from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';

interface DateTimePickerPrenotazioneProps {
    value: Dayjs | null,
    setValue: (value: Dayjs | null) => void,
    label?: string,
    onError?: (reason: DateTimeValidationError, value: Dayjs | null) => void,
    minDate?: Dayjs,
}

const componentClassName = 'date-time-picker-prenotazione';

export const DateTimePickerPrenotazione = (props: DateTimePickerPrenotazioneProps) => {

    const equalsDate = () => {
        if (props.value != null && props.minDate != null) {
            return props.value.isSame(props.minDate, 'date');
        }
        return false;
    }

    return (
        <div className={`${componentClassName}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label={props.label}
                    renderInput={(params) => <TextField {...params} />}
                    value={props.value}
                    onChange={props.setValue}
                    ampmInClock={false}
                    ampm={false}
                    inputFormat={'DD/MM/YYYY HH:mm'}
                    mask={'__/__/____ __:__'}
                    onError={props.onError}
                    minDate={props.minDate}
                    minTime={equalsDate() ? props.minDate : undefined}
                />
            </LocalizationProvider>
        </div>
    )
};
