
import ConfigContent from "./ConfigContent";
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import { Tabs, theme } from "antd";
import { useEffect } from "react";
import './DesignerRight.less'
const { useToken } = theme;
const DesignerRight = observer(() => {
    const {menus, setActiveMenu} = rightStore;
    const { token } = useToken();
    useEffect(() => {
        menus && menus.length && setActiveMenu(menus[0]['key'])
    }, [menus, setActiveMenu])
    return (
        <Tabs
            className={'designer-right-tabs-panel'}
            style={
                {
                    height: '100%',
                    background: token.colorBgLayout,
                    borderLeft: `1px solid ${token.colorBorder}`
                }
            }
            tabBarStyle={
                {
                    height: '100%',
                    borderLeft: `1px solid ${token.colorBorder}`
                }
            }
            tabPosition={'right'}
            onChange={(key) => {setActiveMenu(key)}}
            items={menus.map(item => {
                return {
                    label: item.name,
                    key: item.key,
                    children: <ConfigContent />,
                };
            })}
        />
    );
})

export default DesignerRight;