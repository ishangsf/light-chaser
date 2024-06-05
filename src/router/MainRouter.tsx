import {lazy, useEffect, useState} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConfigProvider} from "antd";
import themeConfigStore from '../store/themeStore.ts';
import { observer } from 'mobx-react';

const DesignerViewPage = lazy(() => import('../pages/view/DesignerViewPage.tsx'));
const DesignerPage = lazy(() => import('../pages/designer/DesignerPage.tsx'));
const GlobalMessage = lazy(() => import('../framework/message/GlobalMessage.tsx'));
const Login = lazy(() => import('../pages/login/Login'));
const Home = lazy(() => import('../pages/home/Home'));
const LocalProjectList = lazy(() => import('../pages/home/local-list/LocalProjectList.tsx'));
const ServerProjectList = lazy(() => import('../pages/home/server-list/ServerProjectList.tsx'));
const DataSourceList = lazy(() => import('../pages/home/datasource/DataSourceList.tsx'));
const TemplateMarket = lazy(() => import('../pages/home/template-market/TemplateMarket.tsx'));
const MoreInfo = lazy(() => import('../pages/home/more-info/MoreInfo.tsx'));
const Demo = lazy(() => import('../test/Demo'));

const router = createBrowserRouter([
    {
        path: '/view',
        element: <DesignerViewPage/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/test',
        element: <Demo/>
    },
    {
        path: '/designer',
        element: <DesignerPage/>
    },
    {
        path: '/home',
        element: <Home/>,
        children: [
            {
                path: 'local',
                element: <LocalProjectList/>,
            },
            {
                path: 'server',
                element: <ServerProjectList/>,
            },
            {
                path: 'datasource',
                element: <DataSourceList/>,
            },
            {
                path: 'template',
                element: <TemplateMarket/>,
            },
            {
                path: 'more',
                element: <MoreInfo/>
            }
        ]
    },
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '*',
        element: <div>not found</div>
    }
])

const MainRouter = () => {
    const [ theme, setTheme ] = useState();
    const { themeConfig } =  themeConfigStore
    useEffect(() => {
        setTheme(themeConfig)
    }, [themeConfig])
    return (
        <ConfigProvider 
            theme={theme}
        >
            <RouterProvider router={router}/>
            <GlobalMessage/>
        </ConfigProvider>
    );
}

const MainRouterObserver = observer(MainRouter);
export default MainRouterObserver
