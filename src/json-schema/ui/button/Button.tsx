import React from 'react';
import './Button.less';
import { Button } from 'antd';

export default function MyButton(props: any) {
    const {onChange, onClick, ...rest} = props;

    const _onChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChange && onChange();
        onClick && onClick(e);
    }

    return (
        <Button {...rest} onClick={_onChange} >{props.children}</Button>
    );
}