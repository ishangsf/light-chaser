import {ReactNode} from 'react';
import './Accordion.less';
import {Collapse} from "antd";

interface AccordionProps {
    /**
     * 标题
     */
    label?: string;
    /**
     * 说明文字
     */
    tip?: string;
    /**
     * 是否显示开关
     */
    showSwitch?: boolean;
    // 开关值变化回调
    onChange?: (data: boolean) => void;
    // 开关状态值（受控）
    value?: boolean;
    // 开关状态值（非受控）
    defaultValue?: boolean;
    titleStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    children?: ReactNode;
}

/**
 * 手风琴组件
 * 说明:该组件的。 Title属性show switch属性。 都是非受控的属性。 也就是说只能在创建这个组件的时候就确定这两个属性的值，
 * 后续是无法改变的。 除非销毁这个组件之后重新创建组件。 Value属性和defaultValue属性。 两者任选其一。 如果你使用value属性。
 * 则这个组件的值是受控的。 可以通过外部控制来更新这个组件的状态值。 如果你使用的是defaultValue属性，则这个组件的值是非受控的。
 * 操作这个组件的时候。 组件值，由本组件自身维护，不受外部控制。
 */
export default function Accordion(props: AccordionProps) {
    const {
        label, children
    } = props;

    return (
        <Collapse
            style={{marginBottom: 10}}
            defaultActiveKey={['1']}
            expandIconPosition={'end'}
            size={'small'}
            items={[{
                label: label,
                children: children,
                key: '1',
            }]}
        />
    );
}