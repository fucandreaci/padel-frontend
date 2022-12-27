import React, {useEffect, useState} from 'react';
import './prenotazioniSection.scss'
import {useAppDispatch} from 'store/store.config';
import {useSelector} from 'react-redux';
import {prenotazioniSelector} from 'store/prenotazioni/prenotazioni.selector';
import {ResponsePrenotazioneWithTypeDto} from 'models/prenotazioni';
import {Alert, AlertTitle, Fab, Typography} from '@mui/material';
import {prenotazioniAction} from 'store/prenotazioni/prenotazioni.action';
import {PrenotazioneDetail} from './components/prenotazioneDetail/prenotazioneDetail.component';
import {Add} from '@mui/icons-material';
import {AddPrenotazione} from './components/addPrenotazione/addPrenotazione.component';

interface PrenotazioniSectionProps{
}

const componentClassName = 'prenotazioni-section';

export const PrenotazioniSection = (props: PrenotazioniSectionProps) => {
    const dispatch = useAppDispatch();

    const [creationPanelOpen, setCreationPanelOpen] = useState(false);

    const isLoading: boolean = useSelector(prenotazioniSelector.isLoading);
    const error: string | undefined = useSelector(prenotazioniSelector.getError);
    const prenotazioni: ResponsePrenotazioneWithTypeDto[] = useSelector(prenotazioniSelector.getPrenotazioni);

    useEffect(() => {
        dispatch(prenotazioniAction.fetchMyPrenotazioni());
    }, []);

    const fabStyle = {
        position: 'fixed',
        bottom: 16,
        right: 16,
    };


    return (
    <div className={`${componentClassName}`}>
        <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
            Prenotazioni
        </Typography>
        {
            !isLoading && !prenotazioni.length && error === undefined &&
            (
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    Non ci sono prenotazioni da mostrare!
                </Alert>
            )
        }

        {
            !isLoading && error !== undefined && (
                <Alert severity="error">
                    <AlertTitle>Si è verificato un errore!</AlertTitle>
                    {error}
                </Alert>
            )
        }

        {
            !isLoading && error === undefined && prenotazioni.length > 0 && prenotazioni.map((prenotazione, index) => (
                <PrenotazioneDetail prenotazione={prenotazione} key={index}/>
            ))
        }

        <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setCreationPanelOpen(true)}>
            <Add />
        </Fab>

        <AddPrenotazione open={creationPanelOpen} setOpen={setCreationPanelOpen}/>
    </div>
    )
};
