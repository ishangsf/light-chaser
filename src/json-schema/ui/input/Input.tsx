import {ChangeEvent, KeyboardEvent} from 'react';
import './Input.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

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
    onKeyDown?: (event: KeyboardEvent) => void;
}

export default function Input(props: InputProps) {
    const {
        value, defaultValue, prefix, suffix, type, placeholder, autoFocus,
        minLength, maxLength, disabled, onChange, onKeyDown,
        ...containerProps
    } = props;

    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.value);
    }

    return (
        <UIContainer {...containerProps}>
            <div className={'lc-input-content'}>
                {prefix && <div className={'lc-input-prefix'}>{prefix}&nbsp;</div>}
                <div className={'lc-input-body'}>
                    <input value={value}
                           defaultValue={defaultValue}
                           minLength={minLength}
                           maxLength={maxLength}
                           disabled={disabled}
                           placeholder={placeholder}
                           autoFocus={autoFocus}
                           type={type}
                           className={'lc-input'}
                           onKeyDown={onKeyDown}
                           onChange={_onChange}/>
                </div>
                {suffix && <div className={'lc-input-suffix'}>&nbsp;{suffix}</div>}
            </div>
        </UIContainer>
    );
}