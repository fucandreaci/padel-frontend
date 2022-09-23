import React from 'react';
import './orariCard.scss'
import {Box, Card, CardContent, Typography} from '@mui/material';
import {OrariStruttura} from 'models/informazioni';

interface OrariCardProps {
    titolo: string,
    orari: OrariStruttura[],
}

const componentClassName = 'orari-card';

export const OrariCard = (props: OrariCardProps) => {

    const formatDate = (inputDate: string): string => {
        const parts = inputDate.split(':');
        if (parts.length < 2) {
            return '--:--';
        }

        return parts[0] + ':' + parts[1];
    }

    return (
        <div className={`${componentClassName}`}>
            <Box sx={{minWidth: 275}} marginBottom={5}>
                <Card variant="outlined" style={{width: '100%'}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {props.titolo}
                        </Typography>

                        {
                            props.orari.map((orario) => (
                                <div key={orario.giorno} style={{marginBottom: '30px'}}>
                                    <Typography variant="h5" component="div">
                                        {orario.giorno}
                                    </Typography>
                                    <Typography variant="body2">
                                        Dalle {formatDate(orario.dalle)} alle {formatDate(orario.alle)}
                                    </Typography>
                                </div>
                            ))
                        }

                    </CardContent>
                </Card>
            </Box>
        </div>
    )
};
