import React, {useEffect, useState} from 'react';
import './listAmici.scss'
import {
    Box,
    Card,
    CardContent,
    Chip, DialogContent,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Modal,
    Typography
} from '@mui/material';
import {Person} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {amiciSelector} from 'store/amici/amici.selector';
import {amiciAction} from 'store/amici/amici.action';
import {useAppDispatch} from 'store/store.config';
import {Chat, ChatProps} from './components/chat/chat.component';

interface ListAmiciProps {
}

const componentClassName = 'list-amici';

export const ListAmici = (props: ListAmiciProps) => {
    const dispatch = useAppDispatch();

    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [chatInfo, setChatInfo] = useState<ChatProps | undefined>();

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
                                amici.map((amico) =>
                                    <ListItem
                                        key={amico.idAmico}
                                        onClick={() => {
                                            setIsChatOpen(true);
                                            setChatInfo({
                                                id: amico.idAmico,
                                                nome: amico.nomeAmico,
                                                cognome: amico.cognomeAmico
                                            })
                                        }}
                                        disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <Person/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={amico.cognomeAmico + ' ' + amico.nomeAmico}
                                                secondary={amico.accettata === null && (
                                                    <Chip label='In attesa di risposta' color="warning"
                                                          variant="outlined" size="small"/>)}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }
                        </List>
                    </CardContent>
                </Card>
            </Box>

            <Modal
                open={isChatOpen}
                onClose={() => {
                    setIsChatOpen(false);
                    setChatInfo(undefined);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogContent>
                    <Chat
                        id={chatInfo ? chatInfo.id : 0}
                        nome={chatInfo ? chatInfo.nome : ''}
                        cognome={chatInfo ? chatInfo.cognome : ''}
                    />
                </DialogContent>
            </Modal>
        </div>
    )
};
