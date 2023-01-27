import React, {Component} from 'react';
import '../../../config/chart/antd/style/AntdBarSet.less';
import FillColor from "../../../config/chart/antd/atomic_components/FillColor";
import Legend from "../../../config/chart/antd/atomic_components/Legned";
import RightAngleCoordinates from "../../../config/chart/antd/atomic_components/RightAngleCoordinates";
import BarWidth from "../../../config/chart/antd/atomic_components/BarWidth";
import {dataSort} from "../../../../utils/SortUtil";
import {
    calculateBarWidth,
    calculateFillColor,
    calculateLegendConfig,
    calculateRightAngleCoordinates
} from "../../../config/chart/antd/util/AntdChartConfigUtil";
import Accordion from "../../../base/Accordion";
import LcConfigItem from "../../../base/LcConfigItem";
import ColorSelector from "../../../config/chart/antd/atomic_components/ColorSelector";
import LCNumberInput from "../../../base/LCNumberInput";
import CfgItemBorder from "../../../base/CfgItemBorder";

interface AntdBarSetProps {
    updateChartProps?: (data: any) => void;
    activated?: any;
    chartProps?: any;
}

class AntdBaseBarSet extends Component<AntdBarSetProps> {

    state: any = {
        colors: []
    }

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }

    groupColorChanged = (value: any) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            color: value
        })
    }


    render() {
        const colors = calculateFillColor(this.props.chartProps);
        const sorts = dataSort('type', this.props.chartProps.data);
        const {updateChartProps, chartProps} = this.props;
        return (
            <div className={'elem-chart-config'}>
                {/*图形填充色设置*/}
                <Accordion title={'图形'}>
                    <LcConfigItem title={'填充色'}>
                        <ColorSelector/>
                    </LcConfigItem>
                    <LcConfigItem title={'条形宽度'}>
                        <CfgItemBorder width={'50%'}>
                            <LCNumberInput style={{width: '100%'}}/>
                        </CfgItemBorder>
                    </LcConfigItem>
                </Accordion>
                {/*图例配置*/}
                <Legend {...calculateLegendConfig(this.props.chartProps)}
                        chartProps={chartProps}
                        updateChartProps={updateChartProps}/>
                {/*直角坐标系配置*/}
                <RightAngleCoordinates {...calculateRightAngleCoordinates(this.props.chartProps)}
                                       chartProps={chartProps}
                                       updateChartProps={updateChartProps}/>
            </div>
        );
    }
}

export default AntdBaseBarSet;