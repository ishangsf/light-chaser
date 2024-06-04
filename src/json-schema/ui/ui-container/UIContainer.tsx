import React from "react";
import './UIContainer.less';
import {Tooltip, Typography} from "antd";
import {Help} from "@icon-park/react";
const { Text } = Typography;
export interface UIContainerProps {
    label?: string;
    tip?: string;
    className?: string;
    containerStyle?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    children?: React.ReactNode;
}

export const UIContainer: React.FC<UIContainerProps> = (props) => {
    const {label, tip, children, className, containerStyle, contentStyle, labelStyle} = props;
    return (
        <div className={`ui-container ${className || ''}`} style={{...containerStyle}}>
            {label &&
                <div className={'ui-container-label'} style={{...labelStyle}}>
                    <div><Text style={{fontSize: '12px'}}>{label}</Text></div>
                    {tip && <div className={'ui-container-tip'}>
                        <Tooltip title={tip} style={{marginLeft: 1}}><Help/></Tooltip></div>}
                </div>}
            <div className={'ui-container-content'} style={{...contentStyle}}>{children}</div>
        </div>
    )
}
