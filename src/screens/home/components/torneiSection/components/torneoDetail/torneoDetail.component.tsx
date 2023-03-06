import React, {useEffect, useState} from 'react';
import './torneoDetail.scss'
import {ResponseTorneoDto} from 'models/tornei';
import {Alert, Box, Button, Card, CardActions, CardContent, Chip, Snackbar, Typography} from '@mui/material';
import {useAppDispatch} from 'store/store.config';
import {torneiAction} from 'store/tornei/tornei.action';
import {useSelector} from 'react-redux';
import {torneiSelector} from 'store/tornei/tornei.selector';
import {unwrapResult} from '@reduxjs/toolkit';

interface TorneoDetailProps{
    torneo: ResponseTorneoDto
}

enum UltimaAzione {
    ISCRIZIONE,
    DISISCRIZIONE
}

const componentClassName = 'torneo-detail';

export const TorneoDetail = (props: TorneoDetailProps) => {
    const dispatch = useAppDispatch();

    const [openToastErr, setOpenToastErr] = useState<boolean>(false);
    const [openToastSucc, setOpenToastSucc] = useState<boolean>(false);
    const [ultimaAzione, setUltimaAzione] = useState<UltimaAzione>();

    const errorIscrizione = useSelector(torneiSelector.getErrorIscrizione);

    useEffect(() => {
        setOpenToastErr(errorIscrizione !== undefined);
    }, [errorIscrizione]);

    const onPrenota = async () => {
        setUltimaAzione(UltimaAzione.ISCRIZIONE);

        const result = await dispatch(torneiAction.iscriviUtente({idTorneo: props.torneo.id}));
        await unwrapResult(result);
        setOpenToastSucc(true);
    }

    const onRemovePrenotazione = async () => {
        setUltimaAzione(UltimaAzione.DISISCRIZIONE);

        const result = await dispatch(torneiAction.rimuoviUtente({idTorneo: props.torneo.id}));
        await unwrapResult(result);
        setOpenToastSucc(true);
    }

    const handleCloseErr = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastErr(false);
    };

    const handleCloseSucc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastSucc(false);
    };

    return (
    <div className={`${componentClassName}`}>
        <Box sx={{minWidth: 275, mb: 2}}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div" sx={{mb: 2}}>
                        Torneo #{props.torneo.id}
                    </Typography>

                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {props.torneo.descrizione}
                    </Typography>
                    <Chip
                        label={props.torneo.maxPartecipanti - props.torneo.numPartecipanti + ' posti disponibili'}
                        color={(props.torneo.maxPartecipanti - props.torneo.numPartecipanti) > 0 ? 'primary' : 'error'}
                        variant="outlined" />
                </CardContent>

                {
                    ((props.torneo.maxPartecipanti - props.torneo.numPartecipanti) > 0 || props.torneo.utentePrenotato) && (
                        <CardActions>
                            {
                                props.torneo.utentePrenotato ? (
                                    <Button disabled={!props.torneo.prenotazioneAperta} size="small" variant="contained" color="error" onClick={onRemovePrenotazione}>Rimuovi prenotazione</Button>
                                ) : (
                                    <Button disabled={!props.torneo.prenotazioneAperta} size="small" variant="contained" onClick={onPrenota}>Prenota</Button>
                                )
                            }
                        </CardActions>
                    )
                }
            </Card>
        </Box>

        {errorIscrizione !== undefined && (
            <Snackbar open={openToastErr} autoHideDuration={3000} onClose={handleCloseErr} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseErr} severity="error" sx={{width: '100%'}}>
                    <>{errorIscrizione}</>
                </Alert>
            </Snackbar>)
        }

        <Snackbar open={openToastSucc} autoHideDuration={3000} onClose={handleCloseSucc} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={handleCloseSucc} severity="success" sx={{width: '100%'}}>
                <>Iscrizione {ultimaAzione === UltimaAzione.ISCRIZIONE ? 'aggiunta' : ultimaAzione === UltimaAzione.DISISCRIZIONE ? 'rimossa' : ''} con successo</>
            </Alert>
        </Snackbar>
    </div>
    )
};
