import React, {useState} from 'react';
import cx from 'clsx';
import {CssVarsProvider} from '@mui/joy/styles';
import {Styles, withStyles} from '@mui/styles';
import {Alert, Avatar, Grid, Snackbar, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import {Report} from '@mui/icons-material';
import {MessageItem} from './components/messageItem/messageItem.component';
import {segnalazioniService} from 'api/segnalazioni.service';
import {RequestInviaSegnalazioneDto} from 'models/segnalazioni';
import {tokenUtils} from 'utils/token.utils';
import {AxiosError} from 'axios';

interface ChatMsgProps {
    classes,
    avatar,
    messages,
    side,
    GridContainerProps,
    GridItemProps,
    AvatarProps,
    getTypographyProps,
    userId
}

const ChatMsg = (props: ChatMsgProps) => {
    const {
        classes,
        avatar,
        messages,
        side,
        GridContainerProps,
        GridItemProps,
        AvatarProps,
        getTypographyProps,
        userId
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [messaggioId, setMessaggioId] = useState<string>('');
    const [openToastError, setOpenToastError] = useState<boolean>(false);
    const [openToastSuccess, setOpenToastSuccess] = useState<boolean>(false);
    const [toastError, setToastError] = useState<string>('');

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget.querySelector('p'));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseErr = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastError(false);
    };

    const handleCloseSucc = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToastSuccess(false);
    };

    const segnalaMessaggio = () => {
        const myId = tokenUtils.getPayload().sub
        const idChat = myId < userId ? myId + '_' + userId : userId + '_' + myId;

        const dto: RequestInviaSegnalazioneDto = {
            idMessaggio: messaggioId,
            idChat
        }
        segnalazioniService.inviaSegnalazione(dto).then(() => {
            setOpenToastSuccess(true);
        }).catch((e: any) => {
            console.log(e)
            if (e.response.data.message) {
                setOpenToastError(true);
                setToastError(e.response.data.message);
            }
        })

        handleClose();
    }

    const attachClass = index => {
        if (index === 0) {
            return classes[`${side}First`];
        }
        if (index === messages.length - 1) {
            return classes[`${side}Last`];
        }
        return '';
    };

    const showContextMenu = (e: any, idMsg: string) => {
        if (side === 'left') {
            e.preventDefault();

            setMessaggioId(idMsg);
            handleClick(e);
        }
    }

    return (
        <Grid
            container
            spacing={2}
            justify={side === 'right' ? 'flex-end' : 'flex-start'}
            {...GridContainerProps}
        >
            {side === 'left' && (
                <Grid item {...GridItemProps}>
                    <Avatar
                        src={avatar}
                        {...AvatarProps}
                        className={cx(classes.avatar, AvatarProps.className)}
                    />
                </Grid>
            )}
            <Grid item xs={side === 'left' ? 8 : 12}>
                {messages.map((msg, i) => {
                    const TypographyProps = getTypographyProps(msg, i, props);
                    return (
                        <MessageItem
                            key={msg.id || i}
                            className={cx(
                                classes.msg,
                                classes[side],
                                attachClass(i),
                                TypographyProps.className
                            )}
                            TypographyProps={TypographyProps}
                            classes={classes}
                            attachClass={attachClass}
                            side={side}
                            idMsg={msg.id}
                            msg={msg.msg}
                            showContextMenu={showContextMenu}
                        />
                    );
                })}
            </Grid>

            <CssVarsProvider>
                <Menu
                    id="positioned-menu-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="positioned-menu-button"
                    placement="bottom-end"
                >
                    <MenuItem onClick={segnalaMessaggio} variant="soft" color="danger">
                        <ListItemDecorator sx={{color: 'inherit'}}>
                            <Report/>
                        </ListItemDecorator>{' '}
                        Segnala
                    </MenuItem>
                </Menu>
            </CssVarsProvider>

            {toastError && (
                <Snackbar open={openToastError} autoHideDuration={3000} onClose={handleCloseErr}
                          anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <Alert onClose={handleCloseErr} severity="error" sx={{width: '100%'}}>
                        <>{toastError}</>
                    </Alert>
                </Snackbar>)
            }

            <Snackbar open={openToastSuccess} autoHideDuration={3000} onClose={handleCloseSucc}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSucc} severity="success" sx={{width: '100%'}}>
                    <>Messaggio segnalato</>
                </Alert>
            </Snackbar>
        </Grid>
    );
}

ChatMsg.propTypes = {
    avatar: PropTypes.string,
    messages: PropTypes.arrayOf(Object),
    side: PropTypes.oneOf(['left', 'right']),
    GridContainerProps: PropTypes.shape({}),
    GridItemProps: PropTypes.shape({}),
    AvatarProps: PropTypes.shape({}),
    getTypographyProps: PropTypes.func,
};
ChatMsg.defaultProps = {
    avatar: '',
    messages: [],
    side: 'left',
    GridContainerProps: {},
    GridItemProps: {},
    AvatarProps: {},
    getTypographyProps: () => ({}),
};

const radius = 20
const grey = '#b6b6b6'
const rightBgColor = '#5573ff'

const defaultChatMsgStyles: Styles<string, any> = {
    avatar: {
        width: 40,
        height: 40
    },
    leftRow: {
        textAlign: 'left'
    },
    rightRow: {
        textAlign: 'right'
    },
    msg: {
        padding: '1% 2%',
        borderRadius: 4,
        marginBottom: 4,
        display: 'inline-block',
        wordBreak: 'break-word',
        fontFamily: // eslint-disable-next-line max-len
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: '14px'
    },
    left: {
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
        backgroundColor: grey
    },
    right: {
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
        backgroundColor: rightBgColor,
        color: '#fff'
    },
    leftFirst: {
        borderTopLeftRadius: radius
    },
    leftLast: {
        borderBottomLeftRadius: radius
    },
    rightFirst: {
        borderTopRightRadius: radius
    },
    rightLast: {
        borderBottomRightRadius: radius
    }
}

export default withStyles(defaultChatMsgStyles, {name: 'ChatMsg'})(ChatMsg);