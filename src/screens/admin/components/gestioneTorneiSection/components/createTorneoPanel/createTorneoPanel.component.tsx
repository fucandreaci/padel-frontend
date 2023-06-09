import React, {useEffect, useState} from 'react';
import './createTorneoPanel.scss'
import {
    Alert,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Stack,
    TextField
} from '@mui/material';
import {Textarea} from '@mui/joy';
import {RequestCreaTorneoDto} from '../../../../../../models/tornei';

interface CreateTorneoPanelProps{
    onClose: () => void;
    onCreate: (dto: RequestCreaTorneoDto) => void;
    showSuccess: boolean;
    isButtonDisable: boolean;
    handleCloseToastr: () => void;
    error?: string
}

const componentClassName = 'create-torneo-panel';

export const CreateTorneoPanel = (props: CreateTorneoPanelProps) => {
    const [descrizione, setDescrizione] = useState<string>('');
    const [maxPartecipanti, setMaxPartecipanti] = useState<number>(0);
    const [isShowingError, setIsShowingError] = useState<boolean>(false);

    useEffect(() => {
        if (props.error) {
            setIsShowingError(true);
        }

        setTimeout(() => {
            setIsShowingError(false);
        }, 3000);
    }, [props.error]);


    const handleClickConfirm = () => {
        if (descrizione && maxPartecipanti) {
            props.onCreate( {
                descrizione,
                maxPartecipanti,
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
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Annulla</Button>
                <Button
                    onClick={handleClickConfirm}
                    variant={'contained'}
                    disabled={!descrizione || !maxPartecipanti || maxPartecipanti <= 0 || props.isButtonDisable}
                    autoFocus>
                    Crea
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
