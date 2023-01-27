import BaseInit, {BaseInfo} from "../../interface/BaseInit";

export default class AntdMuchLineInit implements BaseInit {

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '多重线图',
                type: 'AntdMuchLine'
            },
            baseStyle: {
                padding: '5px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                data: [
                    {
                        "type": "China",
                        "name": "2000",
                        "value": 1211
                    },
                    {
                        "type": "China",
                        "name": "2001",
                        "value": 1339
                    },
                    {
                        "type": "China",
                        "name": "2002",
                        "value": 14705
                    },
                    {
                        "type": "China",
                        "name": "2003",
                        "value": 16602
                    },
                    {
                        "type": "China",
                        "name": "2004",
                        "value": 1955
                    },
                    {
                        "type": "United States",
                        "name": "2000",
                        "value": 10252
                    },
                    {
                        "type": "United States",
                        "name": "2001",
                        "value": 14058
                    },
                    {
                        "type": "United States",
                        "name": "2002",
                        "value": 1093
                    },
                    {
                        "type": "United States",
                        "name": "2003",
                        "value": 11245
                    },
                    {
                        "type": "United States",
                        "name": "2004",
                        "value": 1221
                    },
                ],
                xField: 'name',
                yField: 'value',
                seriesField: 'type',
                xAxis: {
                    grid: null,
                    line: null,
                    label: {style: {fill: 'rgb(0,255,234)'}},
                },
                yAxis: {
                    line: null,
                    grid: null,
                    label: {style: {fill: 'rgb(0,255,234)'}}
                },
                smooth: true,
                animation: {
                    appear: {
                        animation: 'path-in',
                        duration: 5000,
                    },
                },
            }
        };
    }

    getBaseInfo(): BaseInfo {
        return {
            name: "多重线图",
            value: "AntdMuchLine",
            typeInfo: {
                name: "线图",
                type: "line"
            },
        };
    }

}