import {memo} from "react";
import Dialog from "../../../json-schema/ui/dialog/Dialog.tsx";
import Button from "../../../json-schema/ui/button/Button.tsx";

interface DelDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const DelProjectDialog = memo((props: DelDialogProps) => {

    const {onOk, onCancel, visible} = props;

    return (
        <Dialog title={'删除确认'} visible={visible} onClose={onCancel}>
            <div style={{color: '#aeaeae', padding: 10}}>确定要删除该项目吗？</div>
            <div className={'del-pro-confirm'} style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop: 5
            }}>
                <Button style={{float: 'right'}} onClick={onOk}>确认</Button>&nbsp;&nbsp;
                <Button style={{float: 'right'}} onClick={onCancel}>取消</Button>
            </div>
        </Dialog>
    )
})

export default DelProjectDialog