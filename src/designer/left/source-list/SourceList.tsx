import './SourceList.less';
import {lazy, Suspense} from "react";
import Loading from "../../../json-schema/ui/loading/Loading.tsx";
import { theme } from 'antd';
const { useToken } = theme;
const ImageSource = lazy(() => import('./image-source/ImageSource'));

export default function SourceList() {
    const { token } = useToken();
    return <div className={'source-library'}>
        <div className={'source-categorize'} style={{backgroundColor: token.colorBgContainer}}>
            <div className={'categorize-item'}>图片</div>
        </div>
        <div className={'source-library-content'}>
            <Suspense fallback={<Loading/>}>
                <ImageSource/>
            </Suspense>
        </div>
    </div>;
}
