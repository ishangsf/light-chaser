import React from "react";
import './BPFooter.less';
import bluePrintManager from "../manager/BluePrintManager.ts";
import {observer} from "mobx-react";
import { theme } from "antd";
const { useToken } = theme;
const BPFooter: React.FC = observer(() => {
    const { token } = useToken();
    const {canvasScale} = bluePrintManager;
    return (
        <div className={'bp-footer'} style={{borderTop: `1px solid ${token.colorBorder}`}}>
            <div className={'bp-footer-item'}>缩放:{(canvasScale * 100).toFixed(0)}%</div>
        </div>
    )
})

export default BPFooter;
