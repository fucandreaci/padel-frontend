import React, {ReactNode, useEffect, useState} from 'react';
import {
    Alert,
    AlertTitle,
    Button,
    Chip, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fab,
    Typography
} from '@mui/material';
import {useAppDispatch} from '../../../../store/store.config';
import {torneiSelector} from '../../../../store/tornei/tornei.selector';
import {useSelector} from 'react-redux';
import {torneiAction} from '../../../../store/tornei/tornei.action';
import './gestioneTorneiSection.scss'
import {InfoCard} from '../../../../shared/components/infoCard/infoCard.component';
import {RequestCreaTorneoDto, RequestModificaTorneoDto, ResponseTorneoDto} from '../../../../models/tornei';
import {EditTorneoPanel} from './components/editTorneoPanel/editTorneoPanel.component';
import {unwrapResult} from '@reduxjs/toolkit';
import {DeleteTorneoPanel} from './components/deleteTorneoPanel/deleteTorneoPanel.component';
import {Add} from '@mui/icons-material';
import {CreateTorneoPanel} from './components/createTorneoPanel/createTorneoPanel.component';

interface GestioneTorneiSectionProps {
}

const componentClassName = 'gestione-tornei-section';

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

export const GestioneTorneiSection = (props: GestioneTorneiSectionProps) => {
    const dispatch = useAppDispatch();

    const [isPanelEditOpen, setIsPanelEditOpen] = useState<boolean>(false);
    const [isPanelDeleteOpen, setIsPanelDeleteOpen] = useState<boolean>(false);
    const [lastTorneoSelected, setLastTorneoSelected] = useState<ResponseTorneoDto>();
    const [isButtonDisable, setIsButtonDisable] = useState<boolean>(false);
    const [creationPanelOpen, setCreationPanelOpen] = useState<boolean>(false);

    // Edit torneo
    const [showSuccessEdit, setShowSuccessEdit] = useState<boolean>(false);

    // Delete torneo
    const [showSuccessDelete, setShowSuccessDelete] = useState<boolean>(false);

    // Create torneo
    const [showSuccessCreation, setShowSuccessCreation] = useState<boolean>(false);

    const tornei = useSelector(torneiSelector.getTornei);
    const isLoading = useSelector(torneiSelector.isLoading);
    const errorAction = useSelector(torneiSelector.getError);

    useEffect(() => {
        dispatch(torneiAction.fetchTornei());
    }, []);

    const getDescrizioneCompleta = (torneo: ResponseTorneoDto): ReactNode => {
        return <>
            <p>{torneo.descrizione}</p>
            <p>{torneo.numPartecipanti + '/' + torneo.maxPartecipanti + ' partecipanti'}</p>
            <Chip
                label={'Prenotazione ' + (torneo.prenotazioneAperta ? 'aperta' : 'chiusa')}
                color={torneo.prenotazioneAperta ? 'success' : 'error'}
                variant="outlined"/>
        </>;
    }

    const getCardActions = (torneo: ResponseTorneoDto) => {
        return (
            <>
                <Button size="small" onClick={() => {
                    setIsPanelEditOpen(true);
                    setLastTorneoSelected(torneo);
                    dispatch(torneiAction.resetError())
                }}>Modifica</Button>
                <Button size="small" onClick={() => {
                    setIsPanelDeleteOpen(true);
                    setLastTorneoSelected(torneo);
                    dispatch(torneiAction.resetError())
                }}>Elimina</Button>
            </>
        );
    }

    const handleCloseToastr = (setClose: (val: boolean) => void, event?: React.SyntheticEvent | Event, reason?: string,) => {
        if (reason === 'clickaway') {
            return;
        }

        setClose(false);
    }

    const onCreate = async (dto: RequestCreaTorneoDto) => {
        try {
            const response = await dispatch(torneiAction.createTorneo(dto));
            unwrapResult(response);
            setShowSuccessCreation(true);
            setIsButtonDisable(true);

            setTimeout(() => {
                setIsButtonDisable(false);
                setCreationPanelOpen(false);
            }, 3000);
        } catch (e) {
            console.error(e);
        }
    }

    const onDelete = async () => {
        if (lastTorneoSelected) {
            try {
                const response = await dispatch(torneiAction.eliminaTorneo(lastTorneoSelected.id));
                unwrapResult(response);
                setShowSuccessDelete(true);
                setIsButtonDisable(true);

                setTimeout(() => {
                    setIsButtonDisable(false);
                    setIsPanelDeleteOpen(false);
                }, 3000);
            } catch (e) {
                console.error(e);
            }
        }
    }

    const onEdit = async (dto: RequestModificaTorneoDto) => {
        if (lastTorneoSelected) {
            try {
                const response = await dispatch(torneiAction.modificaTorneo({dto, id: lastTorneoSelected.id}));
                unwrapResult(response);
                setShowSuccessEdit(true);
                setIsButtonDisable(true);

                setTimeout(() => {
                    setIsButtonDisable(false);
                    setIsPanelEditOpen(false);
                }, 3000);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Gestione tornei
            </Typography>

            {tornei.length == 0 && !isLoading ? (
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    Nessun torneo trovato!
                </Alert>
            ) : (
                tornei.map((torneo, index) => {
                    return (
                        <InfoCard
                            key={index}
                            descrizione={getDescrizioneCompleta(torneo)}
                            sottoTitolo={''}
                            icon={'🏆'}
                            titolo={'Torneo'}
                            actions={getCardActions(torneo)}
                        />
                    )
                })
            )}

            <Dialog
                open={isPanelEditOpen}
                onClose={() => setIsPanelEditOpen(false)}
                aria-labelledby="edit-dialog-title"
                aria-describedby="edit-dialog-description">
                {
                    lastTorneoSelected && (
                        <EditTorneoPanel
                            torneo={lastTorneoSelected}
                            onClose={() => setIsPanelEditOpen(false)}
                            onEdit={onEdit}
                            showSuccess={showSuccessEdit}
                            isButtonDisable={isButtonDisable}
                            handleCloseToastr={() => handleCloseToastr(setShowSuccessEdit)}
                            error={errorAction}
                        />
                    )
                }
            </Dialog>

            <Dialog
                open={isPanelDeleteOpen}
                onClose={() => setIsPanelDeleteOpen(false)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DeleteTorneoPanel
                    onClose={() => setIsPanelDeleteOpen(false)}
                    onDelete={onDelete}
                    showSuccess={showSuccessDelete}
                    isButtonDisable={isButtonDisable}
                    handleCloseToastr={() => handleCloseToastr(setShowSuccessDelete)}
                    error={errorAction}
                />
            </Dialog>

            <Dialog
                open={creationPanelOpen}
                onClose={() => setIsPanelDeleteOpen(false)}
                aria-labelledby="create-dialog-title"
                aria-describedby="create-dialog-description"
            >
                <CreateTorneoPanel
                    onClose={() => setCreationPanelOpen(false)}
                    onCreate={onCreate}
                    showSuccess={showSuccessCreation}
                    isButtonDisable={isButtonDisable}
                    handleCloseToastr={() => handleCloseToastr(setShowSuccessCreation)}
                    error={errorAction}/>
            </Dialog>

            <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setCreationPanelOpen(true)}>
                <Add />
            </Fab>
        </div>
    )
};
