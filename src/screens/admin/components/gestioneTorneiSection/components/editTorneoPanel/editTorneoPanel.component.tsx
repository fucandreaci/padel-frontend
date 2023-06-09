import React, {useEffect, useState} from 'react';
import {RequestModificaTorneoDto, ResponseTorneoDto} from '../../../../../../models/tornei';
import {
    Alert,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Snackbar,
    Stack,
    Switch,
    TextField
} from '@mui/material';
import './editTorneoPanel.scss'
import {Textarea} from '@mui/joy';

interface EditTorneoPanelProps {
    torneo: ResponseTorneoDto;
    onClose: () => void;
    onEdit: (dto: RequestModificaTorneoDto) => void;
    showSuccess: boolean;
    isButtonDisable: boolean;
    handleCloseToastr: () => void;
    error?: string
}

const componentClassName = 'edit-torneo-panel';

export const EditTorneoPanel = (props: EditTorneoPanelProps) => {
    const [descrizione, setDescrizione] = useState<string>(props.torneo.descrizione);
    const [maxPartecipanti, setMaxPartecipanti] = useState<number>(props.torneo.maxPartecipanti);
    const [prenotazioneAperta, setPrenotazioneAperta] = useState<boolean>(props.torneo.prenotazioneAperta);
    const [isShowingError, setIsShowingError] = useState<boolean>(false);

    useEffect(() => {
        if (props.error) {
            setIsShowingError(true);
        }

        setTimeout(() => {
            setIsShowingError(false);
        }, 3000);
    }, [props.error]);



    const handleClickEdit = () => {
        if (descrizione && maxPartecipanti) {
            props.onEdit( {
                descrizione,
                maxPartecipanti,
                prenotazioneAperta
            });
        }
    }

    return (
        <div className={`${componentClassName}`}>
            <DialogTitle id="edit-dialog-title" className={`${componentClassName}__title`}>
                Modifica torneo
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="edit-dialog-description">
                    Modifica il torneo selezionato
                </DialogContentText>

                <Stack spacing={2}>
                    <Textarea
                        placeholder="Inserisci la descrizione del torneo..."
                        value={descrizione}
                        onChange={(e) => e.target.value.length <= 255 ? setDescrizione(e.target.value) : setDescrizione(descrizione)}
                        minRows={2}
                    />

                    <TextField
                        type={'number'}
                        label="Massimo numero di partecipanti"
                        variant="outlined"
                        sx={{width: '100%'}}
                        value={maxPartecipanti}
                        onChange={(e) => parseInt(e.target.value) > 0 && setMaxPartecipanti(parseInt(e.target.value))}
                    />

                    <FormControlLabel control={<Switch checked={prenotazioneAperta} onChange={(e) => setPrenotazioneAperta(e.target.checked)}/>} label="Prenotazione attiva" />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Annulla</Button>
                <Button
                    onClick={handleClickEdit}
                    variant={'contained'}
                    disabled={!descrizione || !maxPartecipanti || maxPartecipanti < props.torneo.numPartecipanti || maxPartecipanti <= 0 || props.isButtonDisable}
                    autoFocus>
                    Modifica
                </Button>
            </DialogActions>

            <Snackbar open={props.showSuccess} autoHideDuration={3000} onClose={props.handleCloseToastr} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={props.handleCloseToastr} severity="success" sx={{width: '100%'}}>
                    Torneo modificato con successo!
                </Alert>
            </Snackbar>

            <Snackbar open={isShowingError} autoHideDuration={3000} onClose={props.handleCloseToastr}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={props.handleCloseToastr} severity="error" sx={{width: '100%'}}>
                    <>{props.error}</>
                </Alert>
            </Snackbar>
        </div>
    )
};
