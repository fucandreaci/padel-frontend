import React, {useEffect, useState} from 'react';
import './homeAdmin.scss'
import customHistory from '../../navigation/customHistory.config';
import {useCheckAdmin} from './checkAdmin.hook';
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
import {AdminPages} from '../../navigation/pages';
import {Menu} from '@mui/icons-material';
import {utility} from '../../utils/utility';
import {HomeAdminSection} from './components/homeAdminSection/homeAdminSection.component';
import {GestioneCampiSection} from './components/gestioneCampiSection/gestioneCampiSection.component';
import {GestioneTorneiSection} from './components/gestioneTorneiSection/gestioneTorneiSection.component';
import {GestioneSegnalazioni} from './components/gestioneSegnalazioni/gestioneSegnalazioni.component';
import {GestioneCouponSection} from './components/gestioneCouponSection/gestioneCouponSection.component';
import {ImpostazioniSection} from './components/impostazioniSection/impostazioniSection.component';
import {useAppDispatch} from "../../store/store.config";

interface HomeAdminProps {
    window?: () => Window;
}

const componentClassName = 'home-admin';

export const HomeAdmin = (props: HomeAdminProps) => {
    const dispatch = useAppDispatch();
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedPage, setSelectedPage] = useState<AdminPages>(AdminPages.HOME);

    const [_, error] = useCheckAdmin();
    useEffect(() => {
        if (error !== undefined) {
            customHistory.push('/login');
        }
    }, [error]);

    const constDrawer = (
        <Box onClick={() => setMobileOpen(!mobileOpen)} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                Admin Padel
            </Typography>
            <Divider/>
            <List>
                {Object.entries(AdminPages).map(([_, item]) => (
                    <ListItem key={item} disablePadding
                              onClick={() => setSelectedPage(AdminPages[item.toUpperCase().replace(' ', '_')])}>
                        <ListItemButton sx={{textAlign: 'center'}} selected={item === selectedPage}>
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
            case AdminPages.HOME:
                return <HomeAdminSection/>;
            case AdminPages.GESTIONE_CAMPI:
                return <GestioneCampiSection/>;
            case AdminPages.GESTIONE_TORNEI:
                return <GestioneTorneiSection/>;
            case AdminPages.GESTIONE_COUPON:
                return <GestioneCouponSection/>;
            case AdminPages.GESTIONE_SEGNALAZIONI:
                return <GestioneSegnalazioni/>;
            case AdminPages.IMPOSTAZIONI:
                return <ImpostazioniSection />;
            default:
                return <HomeAdminSection/>;
        }
    }

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div className={`${componentClassName}`}>
            <Box sx={{display: 'flex'}}>
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            sx={{mr: 2, display: {sm: 'none'}}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                        >
                            Padel
                        </Typography>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            {Object.entries(AdminPages).map(([_, item]) => (
                                <Button variant={item === selectedPage ? 'contained' : 'text'}
                                        color={item === selectedPage ? 'info' : 'primary'} key={item}
                                        sx={{color: '#fff'}} style={{textTransform: 'none'}}
                                        onClick={() => setSelectedPage(AdminPages[item.toUpperCase().replace(' ', '_')])}
                                        disableElevation>
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
                            display: {xs: 'block', sm: 'none'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 240},
                        }}
                    >
                        {constDrawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{p: 3}} width={'100%'}>
                    <Toolbar/>
                    {renderPage()}
                </Box>
            </Box>
        </div>
    )
};
