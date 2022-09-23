import React, {useEffect, useState} from 'react';
import './signup.scss'
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
import {useSignup} from './signup.hook';
import {RequestSignupDto} from 'models/utente';
import customHistory from 'navigation/customHistory.config';

interface SignupProps{
}

const componentClassName = 'signup';

export const Signup = (props: SignupProps) => {
    const [user, setUser] = useState<RequestSignupDto>();
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [openToastSuccess, setOpenToastSuccess] = useState(false);

    const [, error, data] = useSignup(user);
    const onSubmit = () => {
        const user: RequestSignupDto = {
            nome,
            cognome,
            email,
            password,
        }

        setUser(user);
    }

    useEffect(() => {
        setOpenToast(error !== undefined);
    }, [error])

    useEffect(() => {
        if (data) {
            setOpenToastSuccess(true);

            setTimeout(() => {
                customHistory.push('/login');
            }, 3000);
        }
    }, [data]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };

    const handleCloseSucc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastSuccess(false);
    };

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
                    Registrazione
                </Typography>
                <Box component="div" sx={{ mt: 1 }}>
                    <TextField
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        autoFocus
                    />
                    <TextField
                        value={cognome}
                        onChange={(e) => setCognome(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="cognome"
                        label="Cognome"
                        name="cognome"
                    />
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
                    <TextField
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label="Ripeti password"
                        type="password"
                        id="password2"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onSubmit}
                    >
                        Registrati
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="login" variant="body2">
                                {"Hai già un account? Entra"}
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

        <Snackbar open={openToastSuccess} autoHideDuration={3000} onClose={handleCloseSucc} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={handleCloseSucc} severity="success" sx={{width: '100%'}}>
                Registrazione avvenuta con successo! Effettua il login per continuare.
            </Alert>
        </Snackbar>
    </div>
    )
};
