import React, {useEffect} from 'react';
import './informazioniSection.scss'
import {Alert, AlertTitle, Typography} from '@mui/material';
import {InfoCard} from 'shared/components/infoCard/infoCard.component';
import {useAppDispatch} from 'store/store.config';
import {InfoVarie} from 'models/informazioni';
import {useSelector} from 'react-redux';
import {infoVarieSelector} from 'store/infoVarie/infoVarie.selector';
import {infoVarieAction} from 'store/infoVarie/infoVarie.action';

interface InformazioniSectionProps {
}

const componentClassName = 'informazioni-section';

export const InformazioniSection = (props: InformazioniSectionProps) => {
    const dispatch = useAppDispatch();

    const infoVarie: InfoVarie[] = useSelector(infoVarieSelector.getInfoVarie);
    const isLoading: boolean = useSelector(infoVarieSelector.isLoading);
    const error: string | undefined = useSelector(infoVarieSelector.getError);

    useEffect(() => {
        dispatch(infoVarieAction.fetchInfoVarie());
    }, []);
    
    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Informazioni
            </Typography>

            {
                !isLoading && error !== undefined && (
                    <Alert severity="error">
                        <AlertTitle>Si è verificato un errore!</AlertTitle>
                        {error}
                    </Alert>
                )
            }

            {
                !isLoading && error === undefined && !infoVarie.length &&
                (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Non ci sono informazioni da mostrare!
                    </Alert>
                )
            }

            {
                !isLoading && error === undefined && infoVarie.map((item, index) => (
                    <InfoCard key={index} descrizione={item.descrizione} titolo={item.nome} sottoTitolo={'Fonte Nuova Padel Club'}/>
                ))
            }
        </div>
    )
};
