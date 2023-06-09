import React, {useEffect, useRef, useState} from 'react';
import './addCampoDialog.scss'
import imgNotFoundPlaceholder from '../../../../../../assets/imgNotFoundPlaceholder.png'
import {
    Alert,
    Button,
    CardActionArea,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper, Snackbar,
    Stack,
    TextField
} from '@mui/material';
import {RequestCampoDto} from '../../../../../../models/campi';
import {useAppDispatch} from '../../../../../../store/store.config';
import {campiAction} from '../../../../../../store/campi/campi.action';
import {unwrapResult} from '@reduxjs/toolkit';

interface AddCampoDialogProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

const componentClassName = 'add-campo-dialog';

export const AddCampoDialog = (props: AddCampoDialogProps) => {
    const dispatch = useAppDispatch();

    const [nome, setNome] = useState('');
    const [urlImmagine, setUrlImmagine] = useState('');
    const [openToastSuccess, setOpenToastSuccess] = useState(false);

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if (imgRef.current) {
                imgRef.current.src = urlImmagine;
                imgRef.current.onerror = () => {
                    imgRef.current!.src = imgNotFoundPlaceholder;
                }
            }
        }, 300);
    }, [urlImmagine]);

    const onSave = async () => {
        if (nome && urlImmagine) {
            const dto: RequestCampoDto = {
                nome,
                urlImmagine: urlImmagine.trim()
            }

            try {
                const response = await dispatch(campiAction.aggiungiCampo(dto));
                unwrapResult(response);

                setOpenToastSuccess(true);
                props.setOpen(false);
                setNome('');
                setUrlImmagine('');
            } catch (e) {
                console.error(e);
            }
        }
    }

    const handleCloseSucc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastSuccess(false);
    }

    return (
        <div className={`${componentClassName}`}>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={props.isOpen}
                onClose={() => props.setOpen(false)}
            >
                <DialogTitle>Aggiungi un nuovo campo</DialogTitle>

                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            label="Nome"
                            variant="outlined"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            sx={{mt: 2}}
                        />

                        <TextField
                            label="Url immagine"
                            variant="outlined"
                            value={urlImmagine}
                            onChange={(e) => setUrlImmagine(e.target.value)}
                        />

                        {
                            urlImmagine && urlImmagine.trim() && (
                                <Paper elevation={3} sx={{maxHeight: 300, width: '100%'}}>
                                    <CardActionArea style={{textAlign: 'center', maxHeight: 300}}>
                                        {
                                            <img ref={imgRef} style={{maxHeight: '100%', maxWidth: '100%', height: '300px'}}
                                                 alt={'campo'}/>
                                        }
                                    </CardActionArea>
                                </Paper>
                            )
                        }
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => props.setOpen(false)}>Chiudi</Button>
                    <Button onClick={onSave} variant={'contained'} disabled={!(nome && urlImmagine)}>Aggiungi</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openToastSuccess} autoHideDuration={3000} onClose={handleCloseSucc}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSucc} severity="success" sx={{width: '100%'}}>
                    Campo creato con successo
                </Alert>
            </Snackbar>
        </div>
    )
};
