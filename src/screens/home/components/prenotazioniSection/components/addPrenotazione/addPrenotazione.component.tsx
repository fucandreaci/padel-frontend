import React, {useEffect, useState} from 'react';
import './addPrenotazione.scss'
import {
    Alert,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel, Snackbar,
    Stack, TextField
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
import {prenotazioniAction} from 'store/prenotazioni/prenotazioni.action';
import {RequestPrenotazioneDto} from 'models/prenotazioni';
import {prenotazioniSelector} from 'store/prenotazioni/prenotazioni.selector';
import {unwrapResult} from '@reduxjs/toolkit';

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
    const [coupon, setCoupon] = useState<string>('');
    const [isLezionePrivata, setIsLezionePrivata] = useState<boolean>(false);
    const [isErrorDa, setIsErrorDa] = useState<boolean>(false);
    const [isErrorA, setIsErrorA] = useState<boolean>(false);
    const [hasClickOnCreate, setHasClickOnCreate] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>();
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState<boolean>(false);

    const campi: ResponseCampoDto[] = useSelector(campiSelector.getCampi)
    const maestri: ResponseMaestroDto[] = useSelector(maestriSelector.getMaestri)

    const error = useSelector(prenotazioniSelector.getErrorInsert)

    const now: Dayjs = dayjs();

    useEffect(() => {
        dispatch(campiAction.getAll());
        dispatch(maestriAction.fetchMaestri());
    }, []);

    useEffect(() => {
        if (error !== undefined) {
            setErrorMsg(error);
            setOpenSnackbar(true);
        }
    }, [error]);


    const isDateInError = (reason: DateTimeValidationError, value: Dayjs | null) => {
        return reason !== null || !value;
    }

    const createPrenotazione = async () => {
        setHasClickOnCreate(true);

        if (!selectedCampo || isErrorDa || isErrorA || !da || !a) {
            setErrorMsg('Controlla che tutti i campi siano validi');
            setOpenSnackbar(true);
            return;
        }

        if (isLezionePrivata && !selectedMaestro) {
            setErrorMsg('Seleziona un maestro');
            setOpenSnackbar(true);
            return;
        }

        const prenotazione: RequestPrenotazioneDto = {
            idCampo: selectedCampo.id,
            da: da.toDate(),
            a: a.toDate(),
            codiceCoupon: coupon,
        }

        try {
            const response = await dispatch (
                isLezionePrivata ?
                    prenotazioniAction.insertLezionePrivata({
                        ...prenotazione,
                        idMaestro: selectedMaestro!.id
                    }) :
                    prenotazioniAction.insertPartita(prenotazione)
            )
            unwrapResult(response);

            props.setOpen(false);
            setOpenSnackbarSuccess(true); //TODO Check if work
        } catch (e) {
            const err = e as {message: string}
            setErrorMsg(err.message);
            setOpenSnackbar(true);
        }
    };

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
                        error={hasClickOnCreate && !selectedCampo}
                    />

                    <TextField
                        label="Coupon"
                        variant="outlined"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />


                    <Stack direction={'row'} spacing={2}>
                        <DateTimePickerPrenotazione
                            value={da}
                            setValue={setDa}
                            label={'Da'}
                            minDate={now}
                            onError={
                                (r, v) => setIsErrorDa(isDateInError(r, v))
                            }
                        />

                        <DateTimePickerPrenotazione
                            value={a}
                            setValue={setA}
                            label={'A'}
                            minDate={da != null ? da : undefined}
                            onError={
                                (r, v) => setIsErrorA(isDateInError(r, v))
                            }
                        />
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
                                error={hasClickOnCreate && !selectedMaestro}
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

        <Snackbar open={openSnackbarSuccess} autoHideDuration={3000} onClose={() => setOpenSnackbarSuccess(false)} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={() => setOpenSnackbarSuccess(false)} severity="success" sx={{width: '100%'}}>
                <>Prenotazione creata con successo</>
            </Alert>
        </Snackbar>

        {errorMsg !== undefined && (
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{width: '100%'}}>
                    <>{errorMsg}</>
                </Alert>
            </Snackbar>)
        }
    </div>
    )
};
