import React, {useState} from 'react';
import './addCouponDialog.scss'
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField
} from '@mui/material';
import {RequestGenerateCouponDto, TipoCoupon} from '../../../../../../models/coupon';
import {useAppDispatch} from '../../../../../../store/store.config';
import {unwrapResult} from '@reduxjs/toolkit';
import {couponAction} from '../../../../../../store/coupon/coupon.action';

interface AddCouponDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const componentClassName = 'add-coupon-dialog';

export const AddCouponDialog = (props: AddCouponDialogProps) => {
    const dispatch = useAppDispatch();

    const [openToastSuccess, setOpenToastSuccess] = useState(false);
    const [tipo, setTipo] = useState<TipoCoupon>(TipoCoupon.PERCENTUALE);
    const [valore, setValore] = useState(0);

    const handleCloseSucc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastSuccess(false);
    }

    const handleSetValore = (newValue: number) => {
        if (newValue >= 0) {
            setValore(newValue);
        }
    }

    const onSave = async () => {
        if (tipo && valore) {
            if (tipo === TipoCoupon.PERCENTUALE) {
                if (valore > 100) {
                    setValore(100);
                }
            }

            const dto: RequestGenerateCouponDto = {
                tipo,
                valore
            }

            try {
                const response = await dispatch(couponAction.createCoupon(dto));
                unwrapResult(response);

                setOpenToastSuccess(true);
                props.setOpen(false);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <div className={`${componentClassName}`}>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={props.isOpen}
                onClose={() => props.setOpen(false)}
            >
                <DialogTitle>Aggiungi un nuovo coupon</DialogTitle>

                <DialogContent>
                    <Stack spacing={4}>
                        <div>
                            <InputLabel id="select-tipo-label">Tipo di sconto</InputLabel>
                            <Select
                                labelId="select-tipo-label"
                                id="select-tipo"
                                value={tipo}
                                label="Tipo di sconto"
                                style={{width: '100%'}}
                                onChange={(e) => setTipo(e.target.value as TipoCoupon)}
                            >
                                <MenuItem value={TipoCoupon.PERCENTUALE}>Percentuale</MenuItem>
                                <MenuItem value={TipoCoupon.EURO}>Euro</MenuItem>
                            </Select>
                        </div>
                        <TextField
                            label="Valore"
                            variant="outlined"
                            value={valore}
                            type={'number'}
                            onChange={(e) => handleSetValore(parseFloat(e.target.value))}
                            sx={{mt: 2}}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => props.setOpen(false)}>Chiudi</Button>
                    <Button onClick={onSave} variant={'contained'} disabled={!(valore && tipo)}>Crea</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openToastSuccess} autoHideDuration={3000} onClose={handleCloseSucc}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSucc} severity="success" sx={{width: '100%'}}>
                    Coupon creato con successo
                </Alert>
            </Snackbar>
        </div>
    )
};
