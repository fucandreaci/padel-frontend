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

    useEffect(() => {
        dispatch(infoVarieAction.fetchInfoVarie());
    }, []);
    
    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Informazioni
            </Typography>
            {
                !isLoading && !infoVarie.length &&
                (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Non ci sono informazioni da mostrare!
                    </Alert>
                )
            }

            {
                !isLoading && infoVarie.map((item) => (
                    <InfoCard descrizione={item.descrizione} titolo={'Info'} sottoTitolo={'Fonte Nuova Padel Club'}/>
                ))
            }
        </div>
    )
};
