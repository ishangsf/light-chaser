import './Radio.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import { Radio, RadioChangeEvent } from 'antd';

export interface RadioOption {
    label: string;
    value: string;
}

export interface RadioProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    options?: RadioOption[];
    onChange?: (value: string) => void;
}

export default function myRadio(props: RadioProps) {
    const {value, defaultValue, disabled, options, onChange, ...containerProps} = props;

    const _onChange = (e: RadioChangeEvent) => {
        const value = e.target.value;
        onChange && onChange(value);
    }

    return (
        <UIContainer {...containerProps} className={'lc-radio'}>
            <Radio.Group disabled={disabled} options={options} onChange={_onChange} defaultValue={defaultValue || value} />
        </UIContainer>
    );
}