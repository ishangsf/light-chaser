import { useEffect, useRef } from 'react';
import './LayerList.less';
import layerManager from "../../manager/LayerManager.ts";
import {observer} from "mobx-react";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import layerBuilder from "./LayerBuilder";
import { Layout, theme } from 'antd';
import PanelHeader from '../PanelHeader.tsx';
const { useToken } = theme;
const LayerList = observer(() => {
    const { token } = useToken();
    const layerItemsContainerRef = useRef<HTMLDivElement>(null);
    const layerListRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!layerListRef) return;
            if (layerListRef.current && layerListRef.current.contains(e.target as Node)
                && layerItemsContainerRef.current && layerItemsContainerRef.current.contains(e.target as Node)) {
                const {setTargetIds, targetIds} = eventOperateStore;
                if (targetIds.length > 0)
                    setTargetIds([]);
            }
            if (layerItemsContainerRef.current && e.target instanceof Node) {
                if (layerItemsContainerRef.current.contains(e.target)) {
                    return;
                }
                const {setTargetIds, targetIds} = eventOperateStore;
                if (targetIds.length > 0) {
                    setTargetIds([]);
                }
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [layerItemsContainerRef]);

    const buildLayerList = () => {
        const {layerConfigs} = layerManager;
        return layerBuilder.buildLayerList(layerConfigs)
    };

    return (
        <Layout ref={layerListRef} className='ComponentList layer-list' style={{height: '100%', overflow: 'hidden', borderRight: `1px solid ${token.colorBorder}`} }>
            <PanelHeader title='图层列表' />
            <Layout.Content className={'layer-items'} style={{height: '100%'}}>
                <div ref={layerItemsContainerRef}>
                    {buildLayerList()}
                </div>
            </Layout.Content>
        </Layout>
    );
});
export default LayerList;