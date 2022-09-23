import React, {useEffect} from 'react';
import './newsSection.scss'
import {useAppDispatch} from 'store/store.config';
import {newsAction} from 'store/news/news.action';
import {InfoVarie} from 'models/informazioni';
import {useSelector} from 'react-redux';
import {newsSelector} from 'store/news/news.selector';
import {Alert, AlertTitle, Typography} from '@mui/material';
import {InfoCard} from 'shared/components/infoCard/infoCard.component';

interface NewsSectionProps {
}

const componentClassName = 'news-section';

export const NewsSection = (props: NewsSectionProps) => {
    const dispatch = useAppDispatch();
    
    const news: InfoVarie[] = useSelector(newsSelector.getNews);
    const isLoading: boolean = useSelector(newsSelector.isLoading);

    useEffect(() => {
        dispatch(newsAction.fetchNews());
    }, []);
    
    return (
        <div className={`${componentClassName}`}>
            <Typography component={'p'} variant="h3" align={'center'} gutterBottom>
                News
            </Typography>
            {
                !isLoading && !news.length &&
                (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Non ci sono news da mostrare!
                    </Alert>
                )
            }

            {
                !isLoading && news.map((item) => (
                    <InfoCard descrizione={item.descrizione} titolo={'News'} sottoTitolo={'Fonte Nuova Padel Club'}/>
                ))
            }

        </div>
    )
};
