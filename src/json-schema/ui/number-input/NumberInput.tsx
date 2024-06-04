import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import './NumberInput.less';
import { InputNumber } from 'antd';

export interface NumberInputProps extends UIContainerProps {
    value?: number;
    defaultValue?: number;
    prefix?: string;
    suffix?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (data: number) => void;
}

export default function NumberInput(props: NumberInputProps) {
    const {
        value, defaultValue, prefix, suffix, min,
        max, step, disabled, onChange, ...containerProps
    } = props;

    const _onChange = (value: number | string | null) => {
        onChange && onChange(Number(value));
    }

    return (
        <UIContainer {...containerProps}>
            <InputNumber
                value={value}
                prefix={prefix}
                suffix={suffix}
                defaultValue={defaultValue}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
                type={'number'}
                className={'lc-number-input'}
                onChange={_onChange}
            />
        </UIContainer>
    );
}