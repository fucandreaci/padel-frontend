import React, {useEffect, useState} from 'react';
import './amiciSection.scss'
import {Add, Person} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent, Chip,
    Divider, Fab,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import {useSelector} from 'react-redux';
import {amiciSelector} from 'store/amici/amici.selector';
import {useAppDispatch} from 'store/store.config';
import {amiciAction} from 'store/amici/amici.action';
import {AddAmicoDialog} from './components/addAmicoDialog/addAmicoDialog.component';

interface AmiciSectionProps {
}

const componentClassName = 'amici-section';

export const AmiciSection = (props: AmiciSectionProps) => {
    const dispatch = useAppDispatch();

    const [creationPanelOpen, setCreationPanelOpen] = useState(false);

    const amici = useSelector(amiciSelector.getAmici);

    useEffect(() => {
        dispatch(amiciAction.fetchAmici());
    }, []);

    const fabStyle = {
        position: 'fixed',
        bottom: 16,
        right: 16,
    };

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
                                                primary={amico.cognomeAmico + ' ' + amico.nomeAmico}
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


            <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setCreationPanelOpen(true)}>
                <Add />
            </Fab>

            <AddAmicoDialog open={creationPanelOpen} setOpen={setCreationPanelOpen} />
        </div>
    )
};
