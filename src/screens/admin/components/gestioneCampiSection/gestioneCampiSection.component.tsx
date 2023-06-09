import React, {useEffect, useState} from 'react';
import './gestioneCampiSection.scss'
import {useAppDispatch} from '../../../../store/store.config';
import {campiAction} from '../../../../store/campi/campi.action';
import {useSelector} from 'react-redux';
import {campiSelector} from '../../../../store/campi/campi.selector';
import {InfoCard} from '../../../../shared/components/infoCard/infoCard.component';
import {
    Alert, AlertTitle,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fab,
    IconButton, Snackbar,
    Typography
} from '@mui/material';
import {Add, Delete} from '@mui/icons-material';
import {ResponseCampoDto} from '../../../../models/campi';
import {unwrapResult} from '@reduxjs/toolkit';
import {AddCampoDialog} from './components/addCampoDialog/addCampoDialog.component';

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

interface GestioneCampiSectionProps {
}

const componentClassName = 'gestione-campi-section';

export const GestioneCampiSection = (props: GestioneCampiSectionProps) => {
    const dispatch = useAppDispatch();

    const [inDeleteCampo, setInDeleteCampo] = useState<ResponseCampoDto>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openToastSuccess, setOpenToastSuccess] = useState(false);
    const [isCreationPanelOpen, setIsCreationPanelOpen] = useState(false);

    const campi = useSelector(campiSelector.getCampi)
    const isLoading = useSelector(campiSelector.isLoading)

    useEffect(() => {
        dispatch(campiAction.getAll());
    }, []);

    const getCardActions = (item: ResponseCampoDto) => {
        return (
            <IconButton
                color={'error'}
                aria-label="Elimina"
                onClick={() => {
                    setInDeleteCampo(item);
                    setIsModalOpen(true);
                }}>
                <Delete/>
            </IconButton>
        )
    }

    const onDelete = async () => {
        if (inDeleteCampo) {
            try {
                const response = await dispatch(campiAction.deleteById(inDeleteCampo.id));
                unwrapResult(response);
                setOpenToastSuccess(true);
            } catch (e) {
                console.error(e);
            }
        }
        setIsModalOpen(false);
    }

    const handleCloseSucc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastSuccess(false);
    }

    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Gestione campi
            </Typography>
            {
                campi.length == 0 && !isLoading ? (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Nessun campo trovato! <strong style={{cursor: 'pointer'}} onClick={() => setIsCreationPanelOpen(true)}><u>Aggiungine uno!</u></strong>
                    </Alert>
                ) : (
                    campi.map((campo, index) => {
                        return (
                            <InfoCard
                                key={index}
                                descrizione={''}
                                sottoTitolo={campo.nome}
                                icon={'🏟'}
                                titolo={'Campo'}
                                imageUrl={campo.urlImmagine}
                                actions={getCardActions(campo)}/>
                        )
                    })
                )
            }

            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">
                    Elimina campo
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sei sicuro di voler eliminare il campo <b>{inDeleteCampo?.nome}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setIsModalOpen(false)
                    }}>Annulla</Button>
                    <Button onClick={onDelete} color={'error'} variant={'contained'} autoFocus>
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openToastSuccess} autoHideDuration={3000} onClose={handleCloseSucc}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSucc} severity="success" sx={{width: '100%'}}>
                    Campo eliminato con successo
                </Alert>
            </Snackbar>

            <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setIsCreationPanelOpen(true)}>
                <Add />
            </Fab>

            <AddCampoDialog
                isOpen={isCreationPanelOpen}
                setOpen={setIsCreationPanelOpen} />
        </div>
    )
};
