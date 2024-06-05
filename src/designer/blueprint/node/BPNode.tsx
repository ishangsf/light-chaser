import './BPNode.less';
import {AnchorPointType, NodeInfoType} from "./core/AbstractBPNodeController";
import nodeIconMap from "./NodeIconMap";
import {IPoint} from "../manager/BluePrintManager.ts";
import {ConnectionPoint} from "@icon-park/react";
import { theme } from "antd";
import { observer } from 'mobx-react';
const { useToken } = theme;
export interface NodeProps extends NodeInfoType {
    position?: IPoint;
}
const BPNode = (props: NodeProps) => {
    const { token } = useToken();
    const {icon, name, input = [], output = [], titleBgColor = '#247057'} = props;
        const cpList = [...output, ...input];
        const Icon = nodeIconMap.get(icon) || ConnectionPoint;
        return (
            <div className={'bp-node'} style={{backgroundColor: token.colorBgContainer}}>
                <div className={'bp-node-header'} style={{backgroundColor: titleBgColor}}>
                    <div className={'bp-node-icon'}><Icon/>&nbsp;</div>
                    <div className={'bp-node-title'}>{name}</div>
                </div>
                <div className={'bp-node-body'}>
                    {
                        cpList.map((cp, index) => {
                            const {id, name, type} = cp;
                            return (
                                <div key={index}
                                    style={{backgroundColor: token.colorBgLayout}}
                                     className={`bp-node-ap ${type === AnchorPointType.INPUT ? 'node-ap-input' : 'node-ap-output'}`}>
                                    <div className={'bp-node-ap-circle'}>
                                    <span id={id} className={`ap-circle ${type === AnchorPointType.INPUT ?
                                        'ap-circle-input' : 'ap-circle-output'}`}/>
                                    </div>
                                    <div className={'bg-node-ap-label'}>{name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
}
const BPNodeObserver = observer(BPNode)
export default BPNodeObserver;