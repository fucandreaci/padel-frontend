import React from 'react';
import './regoleCard.scss'
import {Avatar, Box, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material';
import {InfoVarie, OrariStruttura} from 'models/informazioni';
import {Rule} from '@mui/icons-material';

interface RegoleCardProps {
    titolo: string,
    regole: InfoVarie[],
}

const componentClassName = 'regole-card';

export const RegoleCard = (props: RegoleCardProps) => {

    return (
        <div className={`${componentClassName}`}>
            <Box sx={{minWidth: 275}} marginBottom={5}>
                <Card variant="outlined" style={{width: '100%'}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {props.titolo}
                        </Typography>


                        <List>
                            {
                                props.regole.map((orario, index) => (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Rule />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={orario.descrizione}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>

                    </CardContent>
                </Card>
            </Box>
        </div>
    )
};
