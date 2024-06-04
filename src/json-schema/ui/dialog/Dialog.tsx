import {ReactNode} from 'react';
import ReactDOM from "react-dom";
import './Dialog.less';
import {Close} from "@icon-park/react";
import { Typography, theme } from 'antd';
const { useToken } = theme;
const { Text } = Typography;
const Dialog = (props: { title?: any; visible?: any; children?: any; width?: any; height?: any; className?: any; onClose?: any; }) => {
    const {title = '设置', visible = false, children, width = 400, height, className} = props;
    const { token } = useToken();
    const onClose = () => {
        const {onClose} = props;
        onClose && onClose();
    }
    return visible && ReactDOM.createPortal(
        <div className={`lc-dialog lc-dialog-mask ${className}`}>
            <div style={{backgroundColor: token.colorBgContainer}} className={'dialog-body'}>
                <div className={'dialog-header'}>
                    <div className={'dialog-title'}><Text>{title}</Text></div>
                    <div className={'dialog-close'}><Close style={{cursor: 'pointer'}} onClick={onClose}/>
                    </div>
                </div>
                <div className="dialog-content" style={{width, height, minHeight: 100}}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    ) as ReactNode;
}

export default Dialog;