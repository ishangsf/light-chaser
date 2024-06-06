import {observer} from "mobx-react";
import designerLeftStore, { ILeftMenu } from "./DesignerLeftStore";
import './DesignerLeft.less';
import {useEffect, useRef, useState} from "react";
import { Layout, Menu, theme } from "antd";
import { FilterList } from "./filter-lilst/FilterList";
import SourceList from "./source-list/SourceList";
import LayerList from "./layer-list/LayerList";
import { ComponentList } from "./compoent-lib/ComponentList";
import {Connect, Filter, Layers, System} from "@icon-park/react";
const { useToken } = theme;

const menus: Array<ILeftMenu> = [
    {
        icon: <System theme="filled" size={20} strokeWidth={2} strokeLinecap="square"/>,
        name: "组件库",
        key: 'components',
    },
    {
        icon: <Connect theme="filled" size={20} strokeWidth={2} strokeLinecap="square"/>,
        name: "资源库",
        key: 'source-list',
    },
    {
        icon: <Filter theme="filled" size={20} strokeWidth={2} strokeLinecap="square"/>,
        name: "过滤器",
        key: 'filter-list',
    },
    {
        icon: <Layers theme="filled" size={20} strokeWidth={2} strokeLinecap="square"/>,
        name: "图层",
        key: 'layer-list',
    },
];
const { Content, Sider } = Layout;

const DesignerLeft = observer(() => {
    const { token } = useToken();
    const [items, setItems] = useState<any>();
    // 当前菜单内容区域显示状态
    const [siderCollapsed, setSiderCollapsed] = useState<boolean>(true);
    // 当前菜单选中项
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const {menu, setMenu, setDesignerLeftRef} = designerLeftStore;
    const leftDomRef = useRef<HTMLDivElement>(null);

    const onSelectHandle = ({ selectedKeys } : { selectedKeys: string[] }) => {
        setSelectedKeys(selectedKeys);
        setMenu(selectedKeys[0]);
        setSiderCollapsed(selectedKeys.length === 0)
    }

    const onClickHandle = ({ key } : { key: string }) => {
        if (selectedKeys.includes(key)) {
            setSelectedKeys([])
            setMenu('');
            setSiderCollapsed(true)
        }
    }

    useEffect(() => {
        setSiderCollapsed(menu === '')
        if (menu === '') setSelectedKeys([])
    }, [menu])

    useEffect(() => {
        setDesignerLeftRef(leftDomRef.current);
        setItems(menus.map(
            (item) => {
                return {
                    key: item.key,
                    icon: item.icon,
                    label: item.name,
                    title: item.name
                  }
            },
        ))
    }, []);

    return (
        <Layout style={{height: '100%'}} ref={leftDomRef}>
            <Content style={{height: '100%'}}>
                <Menu
                    style={{height: '100%', fontSize: 14, backgroundColor: token.colorBgLayout}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    selectedKeys={selectedKeys}
                    items={items}
                    onSelect={onSelectHandle}
                    onClick={onClickHandle}
                />
            </Content>
            <Sider
                width={250}
                collapsed={siderCollapsed}
                collapsedWidth={0}
                defaultCollapsed={true}
                style={{overflow:'auto', backgroundColor: token.colorBgLayout }}
            >
                {menu === 'components' && <ComponentList />}
                {menu === 'layer-list' && <LayerList />}
                {menu === 'source-list' && <SourceList />}
                {menu === 'filter-list' && <FilterList />}
            </Sider>
        </Layout>
    );
})

export default DesignerLeft;