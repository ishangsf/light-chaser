import {ColorPicker as AntdColorPicker, Typography} from 'antd';
import './ColorPicker.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {Color} from "antd/es/color-picker/color";
import {useState} from "react";
const { Text } = Typography;
interface ColorPickerProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    showText?: boolean;
    disabled?: boolean;
    onChange?: (color: string) => void;
}


export default function ColorPicker(props: ColorPickerProps) {
    const {value, defaultValue, showText, disabled, onChange, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? value : defaultValue);
    const finalValue = controlled ? value : stateValue;

    const onChangeComplete = (color: Color) => {
        const value = color.toHexString();
        onChange && onChange(value);
        if (!controlled)
            setStateValue(value);
    };

    return (
        <UIContainer {...containerProps} className={'lc-color-pick'}>
            <AntdColorPicker
                size={'small'}
                format={'hex'}
                disabled={disabled}
                value={finalValue}
                onChangeComplete={onChangeComplete}
            />
            {showText && <Text style={{marginLeft: '10px'}}>{finalValue?.toUpperCase()}</Text>}
        </UIContainer>
    );
}