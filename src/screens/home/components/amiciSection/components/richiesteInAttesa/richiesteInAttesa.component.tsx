import React, {useEffect} from 'react';
import './richiesteInAttesa.scss'
import {
    Box,
    Card,
    CardContent,
    Chip, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Stack,
    Typography
} from '@mui/material';
import {Block, Done, Person} from '@mui/icons-material';
import {useAppDispatch} from 'store/store.config';
import {amiciAction} from 'store/amici/amici.action';
import {useSelector} from 'react-redux';
import {amiciSelector} from 'store/amici/amici.selector';
import {RequestConfermaAmiciziaDto} from 'models/amici';

interface RichiesteInAttesaProps {
}

const componentClassName = 'richieste-in-attesa';

export const RichiesteInAttesa = (props: RichiesteInAttesaProps) => {
    const dispatch = useAppDispatch();

    const amici = useSelector(amiciSelector.getRichiesteInAttesa);

    useEffect(() => {
        dispatch(amiciAction.fetchRichiesteInSospeso());
    }, []);

    const accettaAmicizia = (idAmico: number, conferma: boolean) => {
        const dto: RequestConfermaAmiciziaDto = {
            idAmico,
            conferma
        }
        dispatch(amiciAction.confermaRichiesta(dto));
    }

    return (
        <div className={`${componentClassName}`}>
            {
                amici.length > 0 && (
                    <Box sx={{minWidth: 275}} marginBottom={5}>
                        <Card variant="outlined" style={{width: '100%'}}>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Richieste in attesa
                                </Typography>
                                <List disablePadding>
                                    {
                                        amici.map((amico) => (
                                            <ListItem key={amico.idAmico} disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <Person/>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={amico.cognomeAmico + ' ' + amico.nomeAmico}
                                                    />
                                                    <Stack direction={'row'} spacing={2}>
                                                        <IconButton color={'success'} onClick={() => accettaAmicizia(amico.idAmico, true)}>
                                                            <Done/>
                                                        </IconButton>

                                                        <IconButton color={'error'} onClick={() => accettaAmicizia(amico.idAmico, false)}>
                                                            <Block/>
                                                        </IconButton>
                                                    </Stack>
                                                </ListItemButton>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </CardContent>
                        </Card>
                    </Box>
                )
            }
        </div>
    )
};
