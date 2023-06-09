import React, {useState} from 'react';
import './updateRegole.scss'
import {Regola} from '../../../../../../models/informazioni';
import {InfoCard} from '../../../../../../shared/components/infoCard/infoCard.component';
import {Button} from '@mui/material';

interface UpdateRegoleProps {
    actualRules: Regola[];
    onUpdate: (rules: Regola[]) => void;
}

const componentClassName = 'update-regole';

export const UpdateRegole = (props: UpdateRegoleProps) => {

    const [rules, setRules] = useState(props.actualRules);

    const getContent = () => {
        return <>
        </>;
    }

    const getActions = () => {
        return <>
            <Button onClick={reset} sx={{mt: 2, mr: 2}}>Annulla</Button>
            <Button onClick={() => props.onUpdate(rules)} variant="contained" sx={{mt: 2, mr: 2}}>Aggiorna</Button>
        </>
    }

    const reset = () => {
        setRules(props.actualRules);
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
