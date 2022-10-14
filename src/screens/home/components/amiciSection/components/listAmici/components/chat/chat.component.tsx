import React from 'react';
import {Box, Typography} from '@mui/material';
import './chat.scss'
import ChatMsg from '../chatMsg/chatMsg.component';

export interface ChatProps{
    id: number,
    nome: string,
    cognome: string,
}

const componentClassName = 'chat';

export const Chat = (props: ChatProps) => {

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

    return (
    <div className={`${componentClassName}`}>
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Chat con {props.nome} {props.cognome}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <ChatMsg
                    avatar={''}
                    messages={[
                        'Hi Jenny, How r u today?',
                        'Did you train yesterday',
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
                    ]}
                    classes={{}}
                />
                <ChatMsg
                    side={'right'}
                    messages={[
                        "Great! What's about you?",
                        'seconda linea',
                        'Of course I did. Speaking of which check this out',
                    ]}
                    classes={{}}
                />
                <ChatMsg avatar={''} messages={['Im good.', 'See u later.']} classes={{}}/>
            </Typography>
        </Box>
    </div>
    )
};
