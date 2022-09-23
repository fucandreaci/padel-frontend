import React from 'react';
import './homeSection.scss'
import {Button, Grid, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';
import {UserPages} from 'navigation/pages';

interface HomeSectionProps {
    setSelectedPage: (page: UserPages) => void
}

const componentClassName = 'home-section';

export const HomeSection = (props: HomeSectionProps) => {
    return (
        <div className={`${componentClassName}`}>

            <Typography component={'span'} variant="h1" gutterBottom>
                Fonte Nuova Padel Club
            </Typography>

            <Grid display="flex" justifyContent="space-around" alignItems="center">
                <Button
                    variant="text"
                    style={{textTransform: 'none'}}
                    size={'large'}
                    endIcon={<Add/>}
                    onClick={() => props.setSelectedPage(UserPages.PRENOTAZIONE)}
                >
                    Prenota partita
                </Button>

                <Button
                    variant="text"
                    style={{textTransform: 'none'}}
                    size={'large'}
                    endIcon={<Add/>}
                    onClick={() => props.setSelectedPage(UserPages.TORNEI)}
                >
                    Iscriviti ad un torneo
                </Button>
            </Grid>
        </div>
    )
};
