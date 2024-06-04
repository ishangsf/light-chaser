import React from 'react';
import './Button.less';
import { Button } from 'antd';

export default function MyButton(props: any) {
    const {onChange, onClick, type, ...rest} = props;

    const _onChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChange && onChange();
        onClick && onClick(e);
    }

    return (
        <Button htmlType={type === 'submit' ? 'submit' : 'button'} type={type === 'submit' ? 'primary' : type} {...rest} onClick={_onChange} >{props.children}</Button>
    );
}