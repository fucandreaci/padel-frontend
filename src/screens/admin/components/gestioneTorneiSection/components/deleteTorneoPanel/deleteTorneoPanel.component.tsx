import React, {useEffect, useState} from 'react';
import './deleteTorneoPanel.scss'
import {Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar} from '@mui/material';

interface DeleteTorneoPanelProps{
    onClose: () => void;
    onDelete: () => void;
    showSuccess: boolean;
    isButtonDisable: boolean;
    handleCloseToastr: () => void;
    error?: string
}

const componentClassName = 'delete-torneo-panel';

export const DeleteTorneoPanel = (props: DeleteTorneoPanelProps) => {
    const [isShowingError, setIsShowingError] = useState<boolean>(false);

    useEffect(() => {
        if (props.error) {
            setIsShowingError(true);
        }

        setTimeout(() => {
            setIsShowingError(false);
        }, 3000);
    }, [props.error]);

    return (
    <div className={`${componentClassName}`}>
        <DialogTitle id="confirm-dialog-title">
            Elimina torneo
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Sei sicuro di voler eliminare il torneo selezionato?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Annulla</Button>
            <Button onClick={props.onDelete} color={'error'} variant={'contained'} disabled={props.isButtonDisable} autoFocus>
                Conferma
            </Button>
        </DialogActions>

        <Snackbar open={props.showSuccess} autoHideDuration={3000} onClose={props.handleCloseToastr} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={props.handleCloseToastr} severity="success" sx={{width: '100%'}}>
                Torneo eliminato con successo!
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
