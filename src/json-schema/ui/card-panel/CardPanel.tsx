import React from "react";
import "./CardPanel.less";
import {Tooltip, Typography} from "antd";
import {Help} from "@icon-park/react";
const { Text } = Typography;
export interface ItemPanelProps {
    label: string;
    tip?: string;
    children: React.ReactNode;
    contentStyle?: React.CSSProperties;
}

export const CardPanel: React.FC<ItemPanelProps> = (props) => {
    const {label, tip, contentStyle, children} = props;
    return (
        <div className={"card-panel"}>
            <div className={"card-panel-label"}>
                <Text>{label}</Text> {tip && <Tooltip className={'card-help'} title={tip}>&nbsp;<Help/>&nbsp;</Tooltip>}
            </div>
            <div style={{...contentStyle}} className={"card-panel-content"}>{children}</div>
        </div>
    )
}
