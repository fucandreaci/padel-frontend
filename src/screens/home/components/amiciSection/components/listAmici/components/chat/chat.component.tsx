import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import './chat.scss'
import ChatMsg from '../chatMsg/chatMsg.component';
import {mapReadChat} from 'utils/firebase.util';
import {Messaggio, MessaggioOrdinato} from 'models/messaggi';
import {tokenUtils} from '../../../../../../../../utils/token.utils';

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
    const myId = parseInt(tokenUtils.getPayload().sub + '')

    useEffect(() => {
        mapReadChat(2, setMessaggi)
    }, []);
    useEffect(() => {
        console.log(messaggi)
    }, [messaggi]);

    return (
        <div className={`${componentClassName}`}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Chat con {props.nome} {props.cognome}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
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
            </Box>
        </div>
    )
};
