import {ReactNode} from "react";
import "./GroupButton.less";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import { Segmented } from "antd";

export interface BtnItemType {
    value: string;
    content: ReactNode | string;
}

export interface GroupButtonProps extends UIContainerProps {
    items: Array<BtnItemType>;
    onChange?: (value: string) => void;
    value?: string;
    defaultValue?: string;
}

export const GroupButton = (props: GroupButtonProps) => {
    const {items, onChange, value, defaultValue, ...containerProps} = props;

    return (
        <UIContainer {...containerProps}>
            <Segmented
                size='middle'
                block
                defaultValue={defaultValue}
                value={value}
                options={items.map(item => ({
                    label: item.content,
                    value: item.value
                }))}
                onChange={(value: string) => {
                    onChange && onChange(value)
                }}
            />
        </UIContainer>
    );
}
