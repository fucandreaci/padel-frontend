import React, {useEffect} from 'react';
import './contattiSection.scss'
import {useAppDispatch} from 'store/store.config';
import {InfoVarie} from 'models/informazioni';
import {useSelector} from 'react-redux';
import {contattiSelector} from 'store/contatti/contatti.selector';
import {Alert, AlertTitle, Link, Typography} from '@mui/material';
import {InfoCard} from 'shared/components/infoCard/infoCard.component';
import {contattiAction} from 'store/contatti/contatti.action';
import {AlternateEmail, Email, Instagram, LocalPhone} from '@mui/icons-material';
import {utility} from 'utils/utility';

interface ContattiSectionProps {
}

enum ContattiType {
    EMAIL = 'email',
    TELEFONO = 'telefono',
    INSTAGRAM = 'instagram',
}

const componentClassName = 'contatti-section';

export const ContattiSection = (props: ContattiSectionProps) => {
    const dispatch = useAppDispatch();

    const contatti: InfoVarie[] = useSelector(contattiSelector.getContatti);
    const isLoading: boolean = useSelector(contattiSelector.isLoading);
    const error: string | undefined = useSelector(contattiSelector.getError);

    useEffect(() => {
        dispatch(contattiAction.fetchContatti());
    }, []);

    const getIconByContattiType = (type: ContattiType) => {
        switch (type) {
            case ContattiType.EMAIL:
                return <Email style={{verticalAlign:"middle"}}/>;
            case ContattiType.TELEFONO:
                return <LocalPhone style={{verticalAlign:"middle"}}/>;
            case ContattiType.INSTAGRAM:
                return <Instagram style={{verticalAlign:"middle"}}/>;
            default:
                return <AlternateEmail style={{verticalAlign:"middle"}}/>;
        }
    }

    const getCaptionByContattiType = (item: InfoVarie) => {
        const type = item.nome as ContattiType;
        switch (type) {
            case ContattiType.EMAIL:
                return <Link href={"mailto:" + item.descrizione} underline="hover">{utility.capitalize(item.descrizione)}</Link>;
            case ContattiType.TELEFONO:
                return <Link href={"tel:" + item.descrizione} underline="hover">{utility.capitalize(item.descrizione)}</Link>;
            case ContattiType.INSTAGRAM:
                return <Link href={"https://www.instagram.com/" + item.descrizione.replace('@', '')} underline="hover">{utility.capitalize(item.descrizione)}</Link>;
            default:
                return <>{utility.capitalize(item.descrizione)}</>;
        }
    }

    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Contatti
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
                !isLoading && error === undefined && !contatti.length &&
                (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Non ci sono contatti da mostrare!
                    </Alert>
                )
            }

            {
                !isLoading && error === undefined && contatti.map((item, index) => (
                    <InfoCard
                        key={index}
                        descrizione={getCaptionByContattiType(item)}
                        titolo={utility.capitalize(item.nome)}
                        sottoTitolo={'Fonte Nuova Padel Club'}
                        icon={getIconByContattiType(item.nome as ContattiType)}/>
                ))
            }
        </div>
    )
};
