import React, {useState} from 'react';
import cx from 'clsx';
import {CssVarsProvider} from '@mui/joy/styles';
import {Styles, withStyles} from '@mui/styles';
import {Avatar, Grid, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import {Report} from '@mui/icons-material';

interface ChatMsgProps {
    classes,
    avatar,
    messages,
    side,
    GridContainerProps,
    GridItemProps,
    AvatarProps,
    getTypographyProps,
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
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget.querySelector('p'));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const attachClass = index => {
        if (index === 0) {
            return classes[`${side}First`];
        }
        if (index === messages.length - 1) {
            return classes[`${side}Last`];
        }
        return '';
    };

    const showContextMenu = (e) => {
        if (side === 'left') {
            e.preventDefault();
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
                        <div key={msg.id || i} className={classes[`${side}Row`]} onContextMenu={showContextMenu}>
                            <Typography
                                align={'left'}
                                {...TypographyProps}
                                className={cx(
                                    classes.msg,
                                    classes[side],
                                    attachClass(i),
                                    TypographyProps.className
                                )}
                            >
                                {msg}
                            </Typography>
                        </div>
                    );
                })}
            </Grid>

            <CssVarsProvider>
                <Menu
                    id="positioned-demo-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="positioned-demo-button"
                    placement="bottom-end"
                >
                    <MenuItem onClick={handleClose} variant="soft" color="danger">
                        <ListItemDecorator sx={{color: 'inherit'}}>
                            <Report/>
                        </ListItemDecorator>{' '}
                        Segnala
                    </MenuItem>
                </Menu>
            </CssVarsProvider>
        </Grid>
    );
}

ChatMsg.propTypes = {
    avatar: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.string),
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