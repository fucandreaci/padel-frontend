import React, {useEffect} from 'react';
import './informazioniSection.scss'
import {Alert, AlertTitle, Typography} from '@mui/material';
import {InfoCard} from 'shared/components/infoCard/infoCard.component';
import {useAppDispatch} from 'store/store.config';
import {InfoVarie, OrariStruttura} from 'models/informazioni';
import {useSelector} from 'react-redux';
import {infoVarieSelector} from 'store/infoVarie/infoVarie.selector';
import {infoVarieAction} from 'store/infoVarie/infoVarie.action';
import {OrariCard} from './components/orariCard/orariCard.component';
import {RegoleCard} from './components/regoleCard/regoleCard.component';

interface InformazioniSectionProps {
}

const componentClassName = 'informazioni-section';

export const InformazioniSection = (props: InformazioniSectionProps) => {
    const dispatch = useAppDispatch();

    const infoVarie: InfoVarie[] = useSelector(infoVarieSelector.getInfoVarie);
    const orariStruttura: OrariStruttura[] = useSelector(infoVarieSelector.getOrariStruttura);
    const regole: InfoVarie[] = useSelector(infoVarieSelector.getRegole);
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
                !isLoading && error === undefined && !infoVarie.length && !orariStruttura.length &&
                (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Non ci sono informazioni da mostrare!
                    </Alert>
                )
            }

            {
                !isLoading && error === undefined && infoVarie.map((item, index) => (
                    <InfoCard key={index} descrizione={item.descrizione} titolo={item.nome}
                              sottoTitolo={'Fonte Nuova Padel Club'}/>
                ))
            }

            {
                !isLoading && error === undefined && orariStruttura.length > 0 && (
                    <OrariCard titolo={'Orari di apertura'} orari={orariStruttura}/>
                )
            }

            {
                !isLoading && error === undefined && regole.length > 0 && (
                    <RegoleCard titolo={'Regole'} regole={regole}/>
                )
            }
        </div>
    )
};
