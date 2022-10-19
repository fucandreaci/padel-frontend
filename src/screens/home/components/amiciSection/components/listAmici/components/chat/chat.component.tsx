import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Snackbar,
    Typography
} from '@mui/material';
import './chat.scss'
import ChatMsg from '../chatMsg/chatMsg.component';
import {mapReadChat} from 'utils/firebase.util';
import {MessaggioOrdinato} from 'models/messaggi';
import {tokenUtils} from 'utils/token.utils';
import {Send} from '@mui/icons-material';
import {messaggiService} from 'api/messaggi.service';

export interface ChatProps {
    id: number,
    nome: string,
    cognome: string,
}

const componentClassName = 'chat';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const Chat = (props: ChatProps) => {
    const [messaggi, setMessaggi] = useState<MessaggioOrdinato[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [openToastError, setOpenToastError] = useState<boolean>(false);
    const [toastError, setToastError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const myId = parseInt(tokenUtils.getPayload().sub + '')

    useEffect(() => {
        setIsLoading(true);

        mapReadChat(props.id, setMessaggi, () => {
            setIsLoading(false);
            setNewMessage('');
        });
    }, []);

    const onSend = () => {
        if (newMessage) {
            setIsLoading(true);
            messaggiService.inviaMessaggio({idDestinatario: props.id, messaggio: newMessage})
                .then(() => {
                })
                .catch((err) => {
                    setNewMessage('');
                    setOpenToastError(true);
                    setToastError('Si è verificato un errore: ' + err.message);
                    setIsLoading(false);
                });
        }
    }

    const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastError(false);
    }
    return (
        <div className={`${componentClassName}`}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Chat con {props.nome} {props.cognome}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    {
                        !isLoading && messaggi.length === 0 &&
                            <Alert severity="info" sx={{mb: 2}}>Nessun messaggio scambiato con {props.nome} {props.cognome}</Alert>
                    }

                    {
                        messaggi.map((messaggio) => (
                            <ChatMsg
                                side={messaggio.user.id === myId ? 'right' : undefined}
                                avatar={messaggio.user.id !== myId ? '' : undefined}
                                messages={messaggio.messages}
                                classes={{}}
                            />
                        ))
                    }

                </Typography>

                <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Invia messaggio</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={isLoading}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={onSend}
                                    edge="end"
                                >
                                    <Send/>
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Invia messaggio"
                    />
                </FormControl>
            </Box>

            {
                openToastError &&
                    <Snackbar open={openToastError} autoHideDuration={3000} onClose={handleCloseToast} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                        <Alert onClose={handleCloseToast} severity="error" sx={{width: '100%'}}>
                            {toastError}
                        </Alert>
                    </Snackbar>
            }
        </div>
    )
};
