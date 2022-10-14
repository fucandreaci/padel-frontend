import React, {useState} from 'react';
import './amiciSection.scss'
import {Add} from '@mui/icons-material';
import {Fab, Typography,} from '@mui/material';
import {AddAmicoDialog} from './components/addAmicoDialog/addAmicoDialog.component';
import {ListAmici} from './components/listAmici/listAmici.component';
import {RichiesteInAttesa} from './components/richiesteInAttesa/richiesteInAttesa.component';

interface AmiciSectionProps {
}

const componentClassName = 'amici-section';

export const AmiciSection = (props: AmiciSectionProps) => {
    const [creationPanelOpen, setCreationPanelOpen] = useState(false);

    const fabStyle = {
        position: 'fixed',
        bottom: 16,
        right: 16,
    };

    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Amici
            </Typography>

            <RichiesteInAttesa/>
            <ListAmici/>

            <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setCreationPanelOpen(true)}>
                <Add />
            </Fab>

            <AddAmicoDialog open={creationPanelOpen} setOpen={setCreationPanelOpen} />
        </div>
    )
};
