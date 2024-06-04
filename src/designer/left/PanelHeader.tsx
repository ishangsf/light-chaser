import { Col, Layout, Row, theme } from "antd";
import designerLeftStore from "./DesignerLeftStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import { Close } from "@icon-park/react";
const { useToken } = theme;

const PanelHeader = (props: { title: string; children?: any }) => {
  const { title } = props;
  const { token } = useToken();
  return (
    <Layout.Header className={'layoutHeader'} style={{height: 48, backgroundColor: token.colorBgLayout, borderBottom: `1px solid ${token.colorBorder}`}}>
        <Row style={{lineHeight: '46px'}}>
            <Col flex="auto">{title}</Col>
            <Col className="oerate-btn" flex={props.children ? '40px' : '16px'}>
                {props.children}
                <Close style={{cursor: 'pointer'}} onClick={() => {
                    const {setMenu} = designerLeftStore;
                    setMenu("");
                    const {rulerRef} = eventOperateStore;
                    rulerRef?.ruleWheel();
                }}/>
            </Col>
        </Row>
    </Layout.Header>
  )
}

export default PanelHeader;