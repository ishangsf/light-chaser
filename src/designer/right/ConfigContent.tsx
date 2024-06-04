import React, {Suspense} from 'react';
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import './ConfigContent.less';
import layerManager from "../manager/LayerManager.ts";
import {AbstractDefinition} from "../../framework/core/AbstractDefinition";
import AbstractDesignerController from "../../framework/core/AbstractDesignerController";
import ObjectUtil from "../../utils/ObjectUtil";
import historyRecordOperateProxy from "../operate-provider/undo-redo/HistoryRecordOperateProxy";
import Loading from "../../json-schema/ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";
import AbstractController from "../../framework/core/AbstractController";
import {DesignerMode} from "../DesignerType.ts";
import {Close} from "@icon-park/react";
import { Col, Layout, Row, theme } from 'antd';
const { useToken } = theme;
export interface ConfigType<T extends AbstractController = AbstractDesignerController> {
    controller: T;
}

const ConfigContent = () => {
    const { token } = useToken();
    const createProxy = (controller: AbstractDesignerController) => {
        return new Proxy(controller, {
            get(target, prop) {
                const originalMethod = target[prop as keyof AbstractDesignerController];
                if (typeof originalMethod === 'function' && originalMethod.name === "update") {
                    return new Proxy(originalMethod, {
                        apply(target, thisArg, argumentsList) {
                            const newValue = argumentsList[0];
                            const oldValue = ObjectUtil.getOriginValue(thisArg.config, argumentsList[0]);
                            historyRecordOperateProxy.doStyleUpd(newValue, oldValue);
                            return target.apply(thisArg, argumentsList);
                        }
                    });
                }
                return originalMethod;
            }
        });
    }

    const buildConfigContent = () => {
        const {compController} = layerManager;
        const {activeMenu, activeElem} = rightStore;
        const abstractConfigObj: AbstractDefinition = DesignerLoaderFactory.getLoader(DesignerMode.EDIT).definitionMap[activeElem.type + '']
        if (!abstractConfigObj) return;
        const configMapping = abstractConfigObj.getMenuToConfigContentMap();
        const ConfigComp: React.ComponentType<ConfigType> = configMapping![activeMenu];
        //使用动态代理对象，监听属性变化
        const controller = createProxy(compController[activeElem.id + '']);
        if (!ConfigComp) return;
        return (
            <Suspense fallback={<Loading/>}>
                <ConfigComp controller={controller}/>
            </Suspense>
        )

    }

    const onClose = () => {
        const {setContentVisible, activeConfig} = rightStore;
        setContentVisible && setContentVisible(false);
        activeConfig && activeConfig(null, null);
    }


    const {activeMenu, menus} = rightStore;
    let activeMenuName = '';
    for (let i = 0; i < menus.length; i++) {
        if (menus[i].key === activeMenu) {
            activeMenuName = menus[i].name;
            break;
        }
    }
    return (
        <Layout className='ComponentList' style={{height: '100%', overflow: 'hidden'}}>
            <Layout.Header className={'layoutHeader'} style={{height: 48, backgroundColor: token.colorBgLayout, borderBottom: `1px solid ${token.colorBorder}`}}>
                <Row style={{lineHeight: '46px'}}>
                    <Col flex="auto">{activeMenuName}</Col>
                    <Col className="oerate-btn" flex={'16px'}>
                        <Close style={{cursor: 'pointer'}} onClick={onClose}/>
                    </Col>
                </Row>
            </Layout.Header>
            <Layout.Content style={{height: '100%'}}>
                <div className={'lc-panel-content'}>
                    {buildConfigContent()}
                </div>
            </Layout.Content>
        </Layout>
    );
}
const ConfigContentObserver = observer(ConfigContent);
export default ConfigContentObserver;