import React, {useEffect, useState} from 'react';
import './home.scss'
import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {UserPages} from 'navigation/pages';
import {utility} from 'utils/utility';
import {HomeSection} from './components/homeSection/homeSection.component';
import {useCheckUser} from './checkUser.hook';
import customHistory from 'navigation/customHistory.config';
import {NewsSection} from './components/newsSection/newsSection.component';
import {InformazioniSection} from './components/informazioniSection/informazioniSection.component';
import {ContattiSection} from './components/contattiSection/contattiSection.component';
import {PrenotazioniSection} from './components/prenotazioniSection/prenotazioniSection.component';
import {AmiciSection} from './components/amiciSection/amiciSection.component';
import {TorneiSection} from './components/torneiSection/torneiSection.component';
import {useAppDispatch} from "../../store/store.config";

interface HomeProps{
    window?: () => Window;
}

const componentClassName = 'home';

export const Home = (props: HomeProps) => {
    const dispatch = useAppDispatch();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedPage, setSelectedPage] = useState<UserPages>(UserPages.HOME);

    const [_, error] = useCheckUser();

    useEffect(() => {
        if (error !== undefined) {
            customHistory.push('/login');
        }
    }, [error]);


    const constDrawer = (
        <Box onClick={() => setMobileOpen(!mobileOpen)} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Padel
            </Typography>
            <Divider />
            <List>
                {Object.entries(UserPages).map(([_, item]) => (
                    <ListItem key={item} disablePadding onClick={() => setSelectedPage(UserPages[item.toUpperCase()])}>
                        <ListItemButton sx={{ textAlign: 'center' }} selected={item === selectedPage}>
                            <ListItemText primary={item}/>
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding
                          onClick={() => {
                              localStorage.removeItem('token');
                              customHistory.push('/login');
                              dispatch('RESET_STORE');
                          }}>
                    <ListItemButton sx={{textAlign: 'center'}}>
                        <ListItemText primary={'Logout'}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const renderPage = () => {
        switch (selectedPage) {
            case UserPages.HOME:
                return <HomeSection setSelectedPage={setSelectedPage}/>;
            case UserPages.INFORMAZIONI:
                return <InformazioniSection />;
            case UserPages.PRENOTAZIONE:
                return <PrenotazioniSection />;
            case UserPages.TORNEI:
                return <TorneiSection />;
            case UserPages.AMICI:
                return <AmiciSection />;
            case UserPages.CONTATTI:
                return <ContattiSection />;
            case UserPages.NEWS:
                return <NewsSection/>;
            default:
                return <HomeSection setSelectedPage={setSelectedPage}/>;
        }
    }

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
    <div className={`${componentClassName}`}>
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Padel
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {Object.entries(UserPages).map(([_, item]) => (
                            <Button variant={item === selectedPage ? 'contained' : 'text'} color={item === selectedPage ? 'info' : 'primary'} key={item} sx={{ color: '#fff' }} style={{textTransform: 'none'}} onClick={() => setSelectedPage(UserPages[item.toUpperCase()])} disableElevation>
                                {utility.capitalize(item)}
                            </Button>
                        ))}
                        <Button variant={'contained'}
                                color={'error'}
                                sx={{color: '#fff'}} style={{textTransform: 'none'}}
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    customHistory.push('/login');

                                }}
                                disableElevation>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(!mobileOpen)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {constDrawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }} width={'100%'}>
                <Toolbar />
                    {renderPage()}
            </Box>
        </Box>
    </div>
    )
};
