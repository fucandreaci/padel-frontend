import React, {useEffect} from 'react';
import './listAmici.scss'
import {
    Box,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import {Person} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {amiciSelector} from 'store/amici/amici.selector';
import {amiciAction} from 'store/amici/amici.action';
import {useAppDispatch} from 'store/store.config';

interface ListAmiciProps{
}

const componentClassName = 'list-amici';

export const ListAmici = (props: ListAmiciProps) => {
    const dispatch = useAppDispatch();

    const amici = useSelector(amiciSelector.getAmici);

    useEffect(() => {
        dispatch(amiciAction.fetchAmici());
    }, []);

    return (
    <div className={`${componentClassName}`}>
        <Box sx={{minWidth: 275}} marginBottom={5}>
            <Card variant="outlined" style={{width: '100%'}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Amici
                    </Typography>
                    <List disablePadding>
                        {
                            amici.map((amico) => (
                                <ListItem key={amico.idAmico} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Person />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={amico.cognomeAmico + ' ' + amico.nomeAmico + ' ' + amico.idAmico}
                                            secondary={amico.accettata === null && (<Chip label='In attesa di risposta' color="warning" variant="outlined" size="small"/>)}
                                        />
                                    </ListItemButton>
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
