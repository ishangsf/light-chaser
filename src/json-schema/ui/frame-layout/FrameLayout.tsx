import React, {ReactNode, useEffect} from "react";
import './FrameLayout.less';
import { Layout, theme } from "antd";
import {observer} from "mobx-react";
import designerLeftStore from "../../../designer/left/DesignerLeftStore";
import rightStore from "../../../designer/right/RightStore";
import eventOperateStore from "../../../designer/operate-provider/EventOperateStore";
const { Header, Content, Footer, Sider } = Layout;
const { useToken } = theme;
export interface FrameLayoutProps {
    header?: ReactNode;
    footer?: ReactNode;
    left?: ReactNode;
    right?: ReactNode;
    content?: ReactNode;
    type?: 'blueprint' | 'editView'
}

const FrameLayout: React.FC<FrameLayoutProps> = (props) => {
    const {header, footer, left, right, content, type = 'editView'} = props;
    const {menus} = rightStore;
    const {menu} = designerLeftStore;
    //更新标尺位置
    const {rulerRef} = eventOperateStore;
    const { token } = useToken();
    useEffect(() => {
        if (rulerRef) {
            setTimeout(() => {
                rulerRef.ruleWheel();
            }, 300);
        }
    }, [rulerRef, menus, menu])
    return (
        <Layout style={{height: '100%', overflow: 'hidden'}}>
            <Header style={{height: 50,padding: 0, background: token.colorBgContainer}}>{header}</Header>
            <Layout style={{height: 'calc(100% - 50px)', padding: 0}}>
                <Sider theme={token.colorBgBase === '#fff' ? 'light' : 'dark'} style={{background: token.colorBgBase}} width={menu === '' && type === 'editView' ? 130 : 320}>{left}</Sider>
                <Layout>
                    <Layout style={{height: 'calc(100% - 40px)', padding: 0}}>
                        <Content>{content}</Content>
                        <Sider theme={token.colorBgBase === '#fff' ? 'light' : 'dark'} width={menus.length ? 460 : 0} style={{background: token.colorBgBase, height: '100%', overflow: 'hidden'}}>{right}</Sider>
                    </Layout>
                    <Footer style={{padding: 0, height: 40}}>{footer}</Footer>
                </Layout>
            </Layout>
        </Layout>
    )
}
const FrameLayoutObserver = observer(FrameLayout);
export default FrameLayoutObserver;