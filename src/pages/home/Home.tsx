import {Suspense, memo} from 'react';
import './Home.less';
import {HomeMenus} from "./menus/HomeMenus";
import {Outlet} from 'react-router-dom';
import Loading from "../../json-schema/ui/loading/Loading.tsx";
import { Layout, Typography, theme } from 'antd';
const { useToken } = theme;
const {Text} = Typography;
const Home = memo(() => {
    const { token } = useToken();
    return (
        <Layout style={{height: '100%', overflow: 'hidden'}}>
            <Layout.Header style={{height: 50, background: token.colorBgContainer, padding: '8px 20px'}} className={'lc-home-header'}>
                <Text style={{fontSize: 16, lineHeight: '35px', display: 'flex'}}>数据可视化系统控制台</Text>
            </Layout.Header>
            <Layout.Content>
                <Layout style={{height: '100%', padding: 0}}>
                    <Layout.Sider width={220} theme={'light'}>
                        <HomeMenus/>
                    </Layout.Sider>
                    <Layout.Content>
                        <Suspense fallback={<Loading/>}>
                            <Outlet/>
                        </Suspense>
                    </Layout.Content>
                </Layout>
            </Layout.Content>
        </Layout>
    );
})

export default Home;


