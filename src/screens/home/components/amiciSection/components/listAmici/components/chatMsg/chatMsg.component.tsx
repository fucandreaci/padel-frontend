import React from 'react';
import cx from 'clsx';

import {Styles, withStyles} from '@mui/styles';
import {Avatar, Grid, Typography} from '@mui/material';
import PropTypes from 'prop-types';

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

    const attachClass = index => {
        if (index === 0) {
            return classes[`${side}First`];
        }
        if (index === messages.length - 1) {
            return classes[`${side}Last`];
        }
        return '';
    };
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
            <Grid item  xs={side==='left' ? 8 : 12}>
                {messages.map((msg, i) => {
                    const TypographyProps = getTypographyProps(msg, i, props);
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={msg.id || i} className={classes[`${side}Row`]}>
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