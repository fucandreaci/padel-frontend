import React, {useEffect} from 'react';
import './impostazioniSection.scss'
import {Typography} from '@mui/material';
import {UpdateNews} from './components/updateNews/updateNews.component';
import {useAppDispatch} from '../../../../store/store.config';
import {useSelector} from 'react-redux';
import {newsAction} from '../../../../store/news/news.action';
import {newsSelector} from '../../../../store/news/news.selector';
import {infoVarieAction} from '../../../../store/infoVarie/infoVarie.action';
import {infoVarieSelector} from '../../../../store/infoVarie/infoVarie.selector';
import {Regola} from '../../../../models/informazioni';
import {UpdateRegole} from './components/updateRegole/updateRegole.component';

interface ImpostazioniSectionProps {
}

const componentClassName = 'impostazioni-section';

export const ImpostazioniSection = (props: ImpostazioniSectionProps) => {
    const dispatch = useAppDispatch();

    const isNewsLoading = useSelector(newsSelector.isLoading);
    const isInfoVarieLoading = useSelector(infoVarieSelector.isLoading);

    const news = useSelector(newsSelector.getNews).find(news => news.nome.toLowerCase() === 'news')?.descrizione || '';
    const regole = useSelector(infoVarieSelector.getRegole) as Regola[];

    useEffect(() => {
        dispatch(newsAction.fetchNews());
        dispatch(infoVarieAction.fetchInfoVarie());
    }, []);

    const updateNews = (text: string) => {
        dispatch(newsAction.updateNews(text)); // TODO: gestione successo/errore
    }

    const updateRegole = (rules: Regola[]) => {
        // dispatch(infoVarieAction.updateRegole(rules)); // TODO: gestione successo/errore
    }

    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                Impostazioni
            </Typography>

            {(!isNewsLoading) && <UpdateNews actualText={news} onUpdate={updateNews}/>}
            {
                (!isInfoVarieLoading) && (
                    <UpdateRegole actualRules={regole} onUpdate={updateRegole}/>
                )
            }

        </div>
    )
};
