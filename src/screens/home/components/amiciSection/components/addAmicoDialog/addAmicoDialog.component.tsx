import React, {useEffect, useState} from 'react';
import './addAmicoDialog.scss'
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar} from '@mui/material';
import {SelectData, SelectItem} from 'shared/components/selectData/selectData.component';
import {amiciMapper} from 'store/amici/amici.mapper';
import {useSelector} from 'react-redux';
import {amiciSelector} from 'store/amici/amici.selector';
import {useAppDispatch} from 'store/store.config';
import {amiciAction} from 'store/amici/amici.action';
import {unwrapResult} from '@reduxjs/toolkit';

interface AddAmicoDialogProps{
    open: boolean,
    setOpen: (open: boolean) => void
}

const componentClassName = 'add-amico-dialog';

export const AddAmicoDialog = (props: AddAmicoDialogProps) => {
    const dispatch = useAppDispatch();

    const [openToastSuccess, setOpenToastSuccess] = useState(false);
    const [selectedAmico, setSelectedAmico] = useState<SelectItem | undefined>();
    const [hasClickOnCreate, setHasClickOnCreate] = useState<boolean>(false);

    const availableAmici = useSelector(amiciSelector.getAvailableAmici);

    useEffect(() => {
        dispatch(amiciAction.fetchAvailableAmici());
    }, []);

    const sendAmicizia = async() => {
        setHasClickOnCreate(true);
        if(selectedAmico){
            try {
                const response = await dispatch(amiciAction.inviaRichiesta({idUtente: selectedAmico.id}));
                unwrapResult(response);

                props.setOpen(false);
                setOpenToastSuccess(true);
            } catch (e) {}
        }
    }

    const handleCloseSucc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastSuccess(false);
    }

    return (
    <div className={`${componentClassName}`}>
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={props.open}
            onClose={() => props.setOpen(false)}
        >
            <DialogTitle>Aggiungi un nuovo amico</DialogTitle>
            <DialogContent>
                <SelectData
                    setSelectedItem={setSelectedAmico}
                    selectedItem={selectedAmico}
                    items={amiciMapper.getSelectItems(availableAmici)}
                    label={'Seleziona un amico'}
                    id={'amico-select'}
                    error={hasClickOnCreate && !selectedAmico}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Chiudi</Button>
                <Button onClick={sendAmicizia} variant={'contained'} disabled={!selectedAmico}>Invia richiesta</Button>
            </DialogActions>
        </Dialog>

        <Snackbar open={openToastSuccess} autoHideDuration={3000} onClose={handleCloseSucc} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={handleCloseSucc} severity="success" sx={{width: '100%'}}>
                Richiesta inviata con successo!
            </Alert>
        </Snackbar>
    </div>
    )
};
