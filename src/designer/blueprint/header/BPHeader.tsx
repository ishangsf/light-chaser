import React from "react";
import './BPHeader.less';
import bluePrintManager from "../manager/BluePrintManager.ts";
import bluePrintHdStore from "../../header/items/blue-print/BluePrintHdStore.ts";
import {Close} from "@icon-park/react";
import { Typography, theme } from "antd";
const { Text } = Typography;
const { useToken } = theme;
const BPHeader: React.FC = () => {
    const { token } = useToken();
    return (
        <div className={'bp-header'} style={{backgroundColor: token.colorBgLayout, borderBottom: `1px solid ${token.colorBorder}`}}>
            <div className={'bp-header-title'}><Text>蓝图编辑器</Text></div>
            <div className={'bp-header-menu'}><Close style={{cursor: 'pointer'}} onClick={() => {
                const {setBluePrintVisible} = bluePrintHdStore;
                setBluePrintVisible(false);
                const {setCanvasTranslate, setCanvasScale} = bluePrintManager;
                setCanvasTranslate({x: 0, y: 0});
                setCanvasScale(1);
            }}/></div>
        </div>
    )
}

export default BPHeader;
