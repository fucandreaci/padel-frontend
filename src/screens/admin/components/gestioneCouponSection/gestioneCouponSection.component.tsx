import React, {useEffect, useState} from 'react';
import './gestioneCouponSection.scss'
import {
    Alert,
    AlertTitle,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Typography
} from '@mui/material';
import {couponAction} from '../../../../store/coupon/coupon.action';
import {useAppDispatch} from '../../../../store/store.config';
import {useSelector} from 'react-redux';
import {couponSelector} from '../../../../store/coupon/coupon.selector';
import {Add, Delete, Discount} from '@mui/icons-material';
import {ResponseCouponDto, TipoCoupon} from '../../../../models/coupon';
import {unwrapResult} from '@reduxjs/toolkit';
import {AddCouponDialog} from './components/addCouponDialog/addCouponDialog.component';

interface GestioneCouponSectionProps {
}

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};
const componentClassName = 'gestione-coupon-section';

export const GestioneCouponSection = (props: GestioneCouponSectionProps) => {
    const dispatch = useAppDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inDeleteCoupon, setInDeleteCoupon] = useState<ResponseCouponDto>();
    const [openToastSuccess, setOpenToastSuccess] = useState(false);
    const [isCreationPanelOpen, setIsCreationPanelOpen] = useState(false);

    const coupons = useSelector(couponSelector.getCoupons);
    const isLoading = useSelector(couponSelector.isLoading);

    useEffect(() => {
        dispatch(couponAction.fetchAllCoupon());
    }, []);

    const handleCloseSucc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastSuccess(false);
    }

    const onDelete = async () => {
        if (inDeleteCoupon) {
            try {
                const resultAction = await dispatch(couponAction.deleteById(inDeleteCoupon.id));
                unwrapResult(resultAction);
                setOpenToastSuccess(true);
            }catch (e) {
                console.log(e);
            }

            setIsModalOpen(false);
        }
    }

    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Gestione coupon
            </Typography>

            {coupons.length == 0 && !isLoading ? (
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    Nessun coupon trovato! <strong style={{cursor: 'pointer'}}
                                                   onClick={() => setIsCreationPanelOpen(true)}><u>Aggiungine
                    uno!</u></strong>
                </Alert>
            ) : (
                <Card variant="outlined" style={{width: '100%'}}>
                    <CardContent>
                        <List disablePadding>
                            {
                                coupons.map((coupon, index) =>
                                    <ListItem
                                        key={coupon.id}
                                        className={index % 2 == 0 ? `${componentClassName}__list-item-gray` : ''}
                                        disablePadding>
                                            <ListItemIcon>
                                                <Discount/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={coupon.codice}
                                                secondary={'-' + coupon.valore + (coupon.tipo === TipoCoupon.PERCENTUALE ? ' %' : ' €')}
                                            />
                                            <ListItemIcon>
                                                <IconButton disabled={coupon.utilizzato} color={'error'} edge="end" aria-label="delete" onClick={() => {
                                                    setInDeleteCoupon(coupon);
                                                    setIsModalOpen(true);
                                                }
                                                }>
                                                    <Delete/>
                                                </IconButton>
                                            </ListItemIcon>
                                    </ListItem>
                                )
                            }
                        </List>
                    </CardContent>
                </Card>
            )}

            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">
                    Elimina coupon
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sei sicuro di voler eliminare il coupon <b>{inDeleteCoupon?.codice}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color={'error'} onClick={() => {
                        setIsModalOpen(false)
                    }}>Annulla</Button>
                    <Button onClick={onDelete} color={'error'} variant={'contained'} autoFocus>
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openToastSuccess} autoHideDuration={3000} onClose={handleCloseSucc}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSucc} severity="success" sx={{width: '100%'}}>
                    Coupon eliminato con successo
                </Alert>
            </Snackbar>

            <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => setIsCreationPanelOpen(true)}>
                <Add />
            </Fab>

            <AddCouponDialog
                isOpen={isCreationPanelOpen}
                setOpen={setIsCreationPanelOpen} />

        </div>
    )
};
