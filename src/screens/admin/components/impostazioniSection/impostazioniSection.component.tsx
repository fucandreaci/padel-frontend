import React, {useEffect, useState} from 'react';
import './impostazioniSection.scss'
import {Alert, Snackbar, Typography} from '@mui/material';
import {UpdateNews} from './components/updateNews/updateNews.component';
import {useAppDispatch} from 'store/store.config';
import {useSelector} from 'react-redux';
import {newsAction} from 'store/news/news.action';
import {newsSelector} from 'store/news/news.selector';

interface ImpostazioniSectionProps {
}

const componentClassName = 'impostazioni-section';

export const ImpostazioniSection = (props: ImpostazioniSectionProps) => {
    const dispatch = useAppDispatch();

    const [openToastSuccess, setOpenToastSuccess] = useState(false);
    const [openToastError, setOpenToastError] = useState<boolean>(false);
    const [toastError, setToastError] = useState<string>('');

    const isNewsLoading = useSelector(newsSelector.isLoading);
    const news = useSelector(newsSelector.getNews).find(news => news.nome.toLowerCase() === 'news')?.descrizione || '';

    useEffect(() => {
        dispatch(newsAction.fetchNews());
    }, []);

    const updateNews = async (text: string) => {
        try {
            await dispatch(newsAction.updateNews(text));
            setOpenToastSuccess(true);
        } catch(err: any) {
            setOpenToastError(true);
            setToastError('Si è verificato un errore: ' + err.response.data.message);
        }
    }

    const handleCloseSucc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastSuccess(false);
    }

    const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastError(false);
    }

    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Impostazioni
            </Typography>

            {!isNewsLoading && <UpdateNews actualText={news} onUpdate={updateNews}/>}

            <Snackbar open={openToastSuccess} autoHideDuration={3000} onClose={handleCloseSucc}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSucc} severity="success" sx={{width: '100%'}}>
                    News aggiornate con successo
                </Alert>
            </Snackbar>

            <Snackbar open={openToastError} autoHideDuration={3000} onClose={handleCloseToast} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseToast} severity="error" sx={{width: '100%'}}>
                    {toastError}
                </Alert>
            </Snackbar>
        </div>
    )
};
