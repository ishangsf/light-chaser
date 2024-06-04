import {ChangeEvent, FocusEvent, KeyboardEvent} from 'react';
import './Input.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import { Input } from 'antd';

export interface InputProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    prefix?: string;
    suffix?: string;
    type?: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;
    autoFocus?: boolean;
    onChange?: (data: string) => void;
    onBlur?: (event: FocusEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
}

export default function MyInput(props: InputProps) {
    const {
        value, defaultValue, prefix, suffix, type, placeholder, autoFocus, onBlur,
        minLength, maxLength, disabled, onChange, onKeyDown,
        ...containerProps
    } = props;

    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.value);
    }

    return (
        <UIContainer {...containerProps}>
            <Input 
                value={value}
                defaultValue={defaultValue}
                minLength={minLength}
                maxLength={maxLength}
                disabled={disabled}
                suffix={suffix}
                prefix={prefix}
                placeholder={placeholder}
                onBlur={onBlur}
                autoFocus={autoFocus}
                type={type}
                size='small'
                onKeyDown={onKeyDown}
                onChange={_onChange}
                {...containerProps}
            />
            {/* <div className={'lc-input-content'}>
                {prefix && <div className={'lc-input-prefix'}>{prefix}&nbsp;</div>}
                <div className={'lc-input-body'}>
                    <input value={value}
                           defaultValue={defaultValue}
                           minLength={minLength}
                           maxLength={maxLength}
                           disabled={disabled}
                           placeholder={placeholder}
                           onBlur={onBlur}
                           autoFocus={autoFocus}
                           type={type}
                           className={'lc-input'}
                           onKeyDown={onKeyDown}
                           onChange={_onChange}/>
                </div>
                {suffix && <div className={'lc-input-suffix'}>&nbsp;{suffix}</div>}
            </div> */}
        </UIContainer>
    );
}