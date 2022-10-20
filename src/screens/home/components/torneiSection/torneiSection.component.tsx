import React, {useEffect} from 'react';
import './torneiSection.scss'
import {Alert, AlertTitle, Typography} from '@mui/material';
import {useAppDispatch} from 'store/store.config';
import {torneiAction} from 'store/tornei/tornei.action';
import {useSelector} from 'react-redux';
import {torneiSelector} from 'store/tornei/tornei.selector';
import {TorneoDetail} from './components/torneoDetail/torneoDetail.component';

interface TorneiSectionProps {
}

const componentClassName = 'tornei-section';

export const TorneiSection = (props: TorneiSectionProps) => {
    const dispatch = useAppDispatch();

    const tornei = useSelector(torneiSelector.getTornei)
    const isLoading = useSelector(torneiSelector.isLoading)

    useEffect(() => {
        dispatch(torneiAction.fetchTornei());
    }, []);

    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Tornei
            </Typography>

            {
                tornei.length == 0 && !isLoading && (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Non ci sono tornei da mostrare!
                    </Alert>
                )

            }

            {
                tornei.map((torneo) => {
                    return (
                        <TorneoDetail key={torneo.id} torneo={torneo}/>
                    )
                })
            }
        </div>
    )
};
