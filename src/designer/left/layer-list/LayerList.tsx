import React, {Component} from 'react';
import './LayerList.less';
import layerManager from "../../manager/LayerManager.ts";
import {observer} from "mobx-react";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import layerBuilder from "./LayerBuilder";
import { Layout } from 'antd';
import PanelHeader from '../PanelHeader.tsx';
export interface LayerListProps {
    children?: React.ReactNode;
}

class LayerList extends Component<LayerListProps> {

    layerListRef: HTMLElement | null = null;

    layerItemsContainerRef: HTMLDivElement | null = null;

    componentDidMount() {
        this.layerListRef?.addEventListener("click", this.cancelSelected);
    }

    componentWillUnmount() {
        this.layerListRef?.removeEventListener("click", this.cancelSelected);
    }

    cancelSelected = (e: MouseEvent) => {
        if (!this.layerListRef)
            return;
        if (this.layerListRef.contains(e.target as Node)
            && !this.layerItemsContainerRef?.contains(e.target as Node)) {
            const {setTargetIds, targetIds} = eventOperateStore;
            if (targetIds.length > 0)
                setTargetIds([]);
        }
    }

    buildLayerList = () => {
        const {layerConfigs} = layerManager;
        return layerBuilder.buildLayerList(layerConfigs);
    }

    render() {
        return (
            <Layout className='ComponentList layer-list' style={{height: '100%', overflow: 'hidden'}}>
                <PanelHeader title='图层列表' />
                <Layout.Content className={'layer-items'} style={{height: '100%'}}>
                    <div ref={ref => this.layerItemsContainerRef = ref}>
                        {this.buildLayerList()}
                    </div>
                </Layout.Content>
            </Layout>
        );
    }
}
const layerListObserver = observer(LayerList);
export default layerListObserver;