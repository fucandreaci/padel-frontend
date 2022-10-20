import React, {useEffect} from 'react';
import './prenotazioneDetail.scss'
import {PrenotazioneType, ResponsePrenotazioneWithTypeDto} from 'models/prenotazioni';
import {Box, Card, CardContent, Chip, Typography} from '@mui/material';
import {Discount, SportsTennis} from '@mui/icons-material';
import {utility} from 'utils/utility';
import {TipoCoupon} from 'models/coupon';

interface PrenotazioneDetailProps {
    prenotazione: ResponsePrenotazioneWithTypeDto
}

const componentClassName = 'prenotazione-detail';

export const PrenotazioneDetail = (props: PrenotazioneDetailProps) => {
    const formatDate = (date: Date) => {
        if (isNaN(date.getTime())) {
            return '';
        }

        date = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const formatTime = (date: Date) => {
        if (isNaN(date.getTime())) {
            return '';
        }
        date = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hours}:${min}`;
    }

    const getIntestazione = () => {
        let intestazione = '';

        if (props.prenotazione.type === PrenotazioneType.PARTITA) {
            intestazione += 'Partita ';
        } else if (props.prenotazione.type === PrenotazioneType.LEZIONE_PRIVATA) {
            intestazione += 'Lezione privata ';
        } else {
            return '';
        }


        intestazione += 'del ' + formatDate(new Date(props.prenotazione.da));
        return intestazione;
    }

    const getCouponValue = () => {
        if (props.prenotazione.coupon) {
            return '-' + props.prenotazione.coupon.valore + (props.prenotazione.coupon.tipo == TipoCoupon.PERCENTUALE ? '%' : '€');
        }
    }

    useEffect(()=> {
        console.log(props.prenotazione);
    }, [])

    return (
        <div className={`${componentClassName}`}>
            <Box sx={{minWidth: 275}}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Prenotazione
                        </Typography>
                        <Typography variant="h5" component="div">
                            {getIntestazione()}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            Dalle {formatTime(new Date(props.prenotazione.da))} alle {formatTime(new Date(props.prenotazione.a))}
                        </Typography>

                        <Chip label={props.prenotazione.campo.nome} color="primary" variant="outlined" sx={{mr: 2}}/>

                        {
                            props.prenotazione.coupon && (
                                <Chip avatar={<Discount />} label={getCouponValue()} />
                            )
                        }

                        {
                            props.prenotazione.type === PrenotazioneType.LEZIONE_PRIVATA && (
                                <Typography variant="body2" mt={2}>
                                    <SportsTennis/> {utility.capitalize(props.prenotazione.lezioniPrivate.nomeMaestro)} {utility.capitalize(props.prenotazione.lezioniPrivate.cognomeMaestro)}
                                </Typography>
                            )
                        }
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
};
