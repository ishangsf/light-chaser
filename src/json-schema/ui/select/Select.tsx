import React, {useState} from "react";
import "./Select.less";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import { Select } from "antd";

export interface ISelectOption {
    label: string;
    value: string;
}

interface SelectProps extends UIContainerProps {
    // 选中的值（受控）
    value?: string;
    // 默认选中的值（非受控）
    defaultValue?: string;
    // 选项列表（非受控）
    options: ISelectOption[];
    disabled?: boolean;
    // 占位符（非受控）
    placeholder?: string;
    // 选中值改变时的回调
    onChange?: (value: string) => void;
}

const mySelect: React.FC<SelectProps> = (props) => {
    const {value, defaultValue, options, disabled = false, placeholder = "请选择", onChange, ...containerProps} = props;
    const handleOptionClick = (value: string): void => {
        onChange && onChange(value || '');
    };
    return (
        <UIContainer {...containerProps}>
            <Select
                placeholder={placeholder}
                disabled={disabled}
                defaultValue={defaultValue || value}
                onChange={handleOptionClick}
                options={options}
            />
        </UIContainer>
    );
};
export default mySelect;