import React, {useEffect, useState} from 'react';
import './login.scss'
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import {LockOutlined} from '@mui/icons-material';
import {RequestLoginDto, ResponseLoginDto, Ruolo} from 'models/utente';
import {useLogin} from './login.hook';
import customHistory from 'navigation/customHistory.config';

interface LoginProps{
}

const componentClassName = 'login';

export const Login = (props: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<RequestLoginDto>();
    const [openToast, setOpenToast] = useState(false);

    const [, error, data] = useLogin(user);

    useEffect(() => {
        setOpenToast(error !== undefined);
    }, [error])

    useEffect(() => {
        if (data) {
            setOpenToast(false);
            const ruolo = (data as ResponseLoginDto).ruolo;

            if (ruolo === Ruolo.USER) {
                customHistory.push('/home');
            } else if (ruolo === Ruolo.ADMIN) {
                customHistory.push('/admin/home');
            }
        }
    }, [data]);


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };

    const onSubmit = () => {
        const dto: RequestLoginDto = {
            email,
            password
        }
        setUser(dto);
    }

    return (
    <div className={`${componentClassName}`}>
        <Container component="main" maxWidth="xs">
            <Typography variant="h3" align={'center'} marginTop={5} gutterBottom>
                Padel
            </Typography>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="div" sx={{ mt: 1 }}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onSubmit}
                    >
                        Entra
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                {"Non hai un account? Registrati"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

        {error !== undefined && (
            <Snackbar open={openToast} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    <>{error}</>
                </Alert>
            </Snackbar>)
        }
    </div>
    )
};
