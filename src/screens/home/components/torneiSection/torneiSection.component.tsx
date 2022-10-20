import React, {useEffect} from 'react';
import './torneiSection.scss'
import {Typography} from '@mui/material';
import {useAppDispatch} from 'store/store.config';
import {torneiAction} from 'store/tornei/tornei.action';
import {useSelector} from 'react-redux';
import {torneiSelector} from 'store/tornei/tornei.selector';
import {TorneoDetail} from './components/torneoDetail/torneoDetail.component';

interface TorneiSectionProps{
}

const componentClassName = 'tornei-section';

export const TorneiSection = (props: TorneiSectionProps) => {
    const dispatch = useAppDispatch();

    const tornei = useSelector(torneiSelector.getTornei)

    useEffect(() => {
        dispatch(torneiAction.fetchTornei());
    }, []);

    return (
    <div className={`${componentClassName}`}>
        <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
            Tornei
        </Typography>

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
