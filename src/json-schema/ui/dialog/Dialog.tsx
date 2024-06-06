import './Dialog.less';
import { Modal } from 'antd';
const Dialog = (props: { title?: any; visible?: any; children?: any; width?: any; height?: any; className?: any; onClose?: any; }) => {
    const {title = '设置', visible = false, children} = props;
    const onClose = () => {
        const {onClose} = props;
        onClose && onClose();
    }
    return (
        <Modal footer={false} okText={'确定'} cancelText={'取消'} width={props.width || 500} title={title} open={visible} onOk={onClose} onCancel={onClose}>
            {children}
        </Modal>
    )
}

export default Dialog;