import './ComponentList.less';
import {Button, Flex, Layout, Tabs, theme} from "antd";
import {componentCategorize, componentSubCategorize} from "./ComponentCategorize";
import componentListStore from "./ComponentListStore";
import {observer} from "mobx-react";
import {ComponentType, lazy, Suspense, useEffect, useState} from "react";
import Loading from "../../../json-schema/ui/loading/Loading.tsx";
import {IIconProps} from "@icon-park/react/lib/runtime";
import PanelHeader from '../PanelHeader.tsx';
const CompList = lazy(() => import('./list/CompList'));

const { useToken } = theme;
export const CategoryList = observer(() => {
    const [menuItems, setMenuItems] = useState<any>();
    const {categories, setCategories, setSubCategories} = componentListStore;
    useEffect(() => {
        setMenuItems(componentCategorize.map(item => {
            const {icon, name, key} = item;
            const Icon = icon as ComponentType<IIconProps>;
            return {
                key: key,
                icon: <Icon theme="filled" size={16} strokeWidth={1} strokeLinecap="square"/>,
                title: name
            }
        }))
        
    }, [categories])
    return (
        menuItems && menuItems.map((item: any) => (
            <Button size='middle' icon={item.icon} type={categories === item.key ? 'primary' : 'text'} title={item.title} key={item.key} onClick={() => {
                setCategories(item.key);
                setSubCategories('all');
            }}></Button>
        ))
    )
});

export const SubCategoryList: React.FC = observer(() => {
    const [tabItems, setTabItems] = useState<any>();
    const {categories, setSubCategories} = componentListStore;
    useEffect(() => {
        const items = componentSubCategorize
        .filter(item => {
            const {key, parentKey} = item;
            if (categories === 'all' || key === 'all' || parentKey === categories) {
                return true;
            } else {
                return false;
            }
        })
        .map(item => {
            const {name, key} = item;
            return {
                label: name,
                key: key,
                children: (
                    <Suspense fallback={<Loading />}>
                        <CompList/>
                    </Suspense>
                ),
            }
        })
        setTabItems(items);
    }, [categories])
    return (
        <Tabs
            className='componentSubCategorizeTabs'
            destroyInactiveTabPane={true}
            defaultActiveKey="1"
            tabPosition={'left'}
            tabBarStyle={{width: 70, padding: 0}}
            tabBarGutter={8}
            style={{ height: '100%', padding: 0}}
            items={tabItems}
            onChange={(key: string) => {
                setSubCategories(key);
            }}
        />
    )
});


export const ComponentList = () => {
    const { token } = useToken();
    return (
        <Layout className='ComponentList' style={{height: '100%', overflow: 'hidden', borderRight: `1px solid ${token.colorBorder}`}}>
            <PanelHeader title='组件列表' />
            <Layout.Content style={{height: '100%'}}>
                <Layout style={{height: '100%'}}>
                    <Layout.Sider width={40} style={{ padding: '4px', height: '100%', backgroundColor: token.colorBgContainer}}>
                        <Flex gap="small" justify='flex-start' align='center' vertical style={{height: '100%'}}>
                            <CategoryList />
                        </Flex>
                    </Layout.Sider>
                    <Layout.Content style={{height: '100%'}}>
                        <SubCategoryList />
                    </Layout.Content>
                </Layout>
            </Layout.Content>
        </Layout>
    )
}
