import React from 'react';
import './messageItem.scss'
import {Typography} from '@mui/material';
import cx from 'clsx';

interface MessageItemProps{
    key: number,
    className: string,
    TypographyProps: any,
    classes: any,
    attachClass: (i: number) => string,
    side: string,
    msg: string,
    showContextMenu: (e: any, id: string) => void,
    idMsg: string
}

const componentClassName = 'message-item';

export const MessageItem = (props: MessageItemProps) => {

    return (
    <div className={`${componentClassName}`}>
        <div className={props.classes[`${props.side}Row`]} onContextMenu={(event) => props.showContextMenu(event, props.idMsg)}>
            <Typography
                align={'left'}
                {...props.TypographyProps}
                className={props.className}
            >
                {props.msg}
            </Typography>
        </div>
    </div>
    )
};
