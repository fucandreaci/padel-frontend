import React, {useEffect, useState} from 'react';
import './gestioneSegnalazioni.scss'
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    DialogContent,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    Stack,
    Typography
} from '@mui/material';
import {useAppDispatch} from '../../../../store/store.config';
import {segnalazioniAction} from '../../../../store/segnalazioni/segnalazioni.action';
import {useSelector} from 'react-redux';
import {segnalazioniSelector} from '../../../../store/segnalazioni/segnalazioni.selector';
import {Chat} from '@mui/icons-material';
import {RequestGestioneSegnalazioneDto, ResponseSegnalazioneDto} from '../../../../models/segnalazioni';
import ChatMsg
    from '../../../home/components/amiciSection/components/listAmici/components/chatMsg/chatMsg.component';

interface GestioneSegnalazioniProps {
}

const componentClassName = 'gestione-segnalazioni';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

export const GestioneSegnalazioni = (props: GestioneSegnalazioniProps) => {
    const dispatch = useAppDispatch();

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedSegnalazione, setSelectedSegnalazione] = useState<ResponseSegnalazioneDto | undefined>();

    const segnalazioni = useSelector(segnalazioniSelector.getSegnalazioni);

    useEffect(() => {
        dispatch(segnalazioniAction.fetchSegnalazioniNonGestite());
    }, []);

    const getUtenti = (segnalazione: ResponseSegnalazioneDto) => {
        const {sender, receiver} = segnalazione.messaggi[0];
        return `${sender.nome} ${sender.cognome} e ${receiver.nome} ${receiver.cognome}`;
    }

    const setSegnalazioneGestita = async (block: boolean) => {
        if (selectedSegnalazione) {
            const dto: RequestGestioneSegnalazioneDto = {
                id: selectedSegnalazione.id,
                blocco: block
            }

            await dispatch(segnalazioniAction.gestisciSegnalazione(dto));
            setIsChatOpen(false);
        }
    }

    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Gestione segnalazioni
            </Typography>

            {
                segnalazioni.length == 0 ? (
                    <Alert severity="info" sx={{mb: 2}}>Nessuna segnalazione da gestire</Alert>
                ) : (
                    <Card variant="outlined" style={{width: '100%'}}>
                        <CardContent>
                            <List disablePadding>
                                {
                                    segnalazioni.map((segnalazione) =>
                                        <ListItem
                                            key={segnalazione.id}
                                            onClick={() => {
                                                setIsChatOpen(true);
                                                setSelectedSegnalazione(segnalazione);
                                            }}
                                            disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <Chat/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={'Chat tra ' + getUtenti(segnalazione)}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </CardContent>
                    </Card>
                )
            }

            {
                selectedSegnalazione && (

                    <Modal
                        open={isChatOpen}
                        onClose={() => {
                            setIsChatOpen(false);
                            setSelectedSegnalazione(undefined);
                        }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <DialogContent>
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Chat tra {getUtenti(selectedSegnalazione)}
                                </Typography>
                                <div className={componentClassName + '__headChat'}>
                                    <Chip label={selectedSegnalazione.messaggi[0].sender.id < selectedSegnalazione.messaggi[0].receiver.id ? selectedSegnalazione.messaggi[0].receiver.nome + ' ' + selectedSegnalazione.messaggi[0].receiver.cognome : selectedSegnalazione.messaggi[0].sender.nome + ' ' + selectedSegnalazione.messaggi[0].sender.cognome} />
                                    <Chip label={selectedSegnalazione.messaggi[0].sender.id > selectedSegnalazione.messaggi[0].receiver.id ? selectedSegnalazione.messaggi[0].receiver.nome + ' ' + selectedSegnalazione.messaggi[0].receiver.cognome : selectedSegnalazione.messaggi[0].sender.nome + ' ' + selectedSegnalazione.messaggi[0].sender.cognome} />
                                </div>
                                <Box id="modal-modal-description" sx={{mt: 2, height: '65vh', overflowY: 'auto'}}>
                                    {
                                        selectedSegnalazione.messaggi.map((messaggio, index) => (
                                            <ChatMsg
                                                key={index}
                                                side={messaggio.sender.id < messaggio.receiver.id ? 'right' : undefined}
                                                avatar={messaggio.sender.id < messaggio.receiver.id ? '' : undefined}
                                                messages={[{msg: messaggio.message, id: messaggio.id}]}
                                                classes={{}}
                                                userId={messaggio.sender.id}
                                            />
                                        ))
                                    }
                                </Box>

                                <Stack
                                    flexDirection={'row'}
                                    className={componentClassName + '__footerChat'}
                                >
                                    <Button variant="outlined" color="error" style={{flexGrow: 1}} onClick={() => setSegnalazioneGestita(false)}>
                                        Ignora
                                    </Button>
                                    <Button variant="contained" color="error" style={{flexGrow: 1}} onClick={() => setSegnalazioneGestita(true)}>
                                        Blocca chat
                                    </Button>
                                </Stack>
                            </Box>
                        </DialogContent>
                    </Modal>
                )
            }
        </div>
    )
};
