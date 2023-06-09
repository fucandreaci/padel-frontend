import React, {useState} from 'react';
import './updateNews.scss'
import {Button, TextField} from '@mui/material';
import {InfoCard} from '../../../../../../shared/components/infoCard/infoCard.component';

interface UpdateNewsProps {
    actualText: string;
    onUpdate: (text: string) => void;
}

const componentClassName = 'update-news';

export const UpdateNews = (props: UpdateNewsProps) => {
    const [text, setText] = useState(props.actualText);
    const getContent = () => {
        return <>
            <TextField
                label="News"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{mt: 2, width: '100%'}}
            />
        </>
    }

    const getActions = () => {
        return <>
            <Button onClick={reset} sx={{mt: 2, mr: 2}}>Annulla</Button>
            <Button onClick={() => props.onUpdate(text)} variant="contained" sx={{mt: 2, mr: 2}}>Aggiorna</Button>
        </>
    }

    const reset = () => {
        setText(props.actualText);
    }

    return (
        <div className={`${componentClassName}`}>
            <InfoCard
                descrizione={getContent()}
                sottoTitolo={'News'}
                titolo={''}
                actions={getActions()}
            />
        </div>
    )
};
