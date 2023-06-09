import React from 'react';
import './homeAdminSection.scss'
import {Button, Grid, Typography} from '@mui/material';

interface HomeAdminSectionProps {
}

const componentClassName = 'home-admin-section';

export const HomeAdminSection = (props: HomeAdminSectionProps) => {

    return (
        <div className={`${componentClassName}`}>

            <Typography component={'span'} variant="h1" gutterBottom>
                Fonte Nuova Padel Club
            </Typography><br />
            <Typography component={'span'} variant="h5" color={'#616161'}>
                Amministratore
            </Typography>

        </div>
    )
};
