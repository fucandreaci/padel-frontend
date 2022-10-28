import React, {ReactNode} from 'react';
import './infoCard.scss'
import {Box, Card, CardActions, CardContent, Typography} from '@mui/material';

interface InfoCardProps {
    descrizione: string | ReactNode,
    titolo?: string,
    sottoTitolo?: string,
    icon?: ReactNode,
    actions?: ReactNode
}

const componentClassName = 'info-card';

export const InfoCard = (props: InfoCardProps) => {

    return (
        <div className={`${componentClassName}`}>
            <Box sx={{minWidth: 275}} marginBottom={5}>
                <Card variant="outlined" style={{width: '100%'}}>
                    <CardContent>
                        {
                            (props.titolo || props.icon) && (
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {props.icon} {props.titolo}
                                </Typography>
                            )
                        }

                        {
                            props.sottoTitolo && (
                                <Typography variant="h5" component="div">
                                    {props.sottoTitolo}
                                </Typography>
                            )
                        }

                        <Typography variant="body2">
                            {props.descrizione}
                        </Typography>
                    </CardContent>

                    {
                        props.actions && (
                            <CardActions disableSpacing>
                                {props.actions}
                            </CardActions>
                        )
                    }
                </Card>
            </Box>
        </div>
    )
};
