import {AbstractDefinition, BaseInfoType, MenuToConfigMappingType} from "../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../common-component/common-types";
import {MenuInfo} from "../../designer/right/MenuType";
import {AppstoreFilled} from "@ant-design/icons";
import BaseInfo from "../common-component/base-info/BaseInfo";
import GroupLayerController, {GroupLayerProps} from "./GroupLayerController";

export default class GroupLayerDefinition extends AbstractDefinition<GroupLayerController, GroupLayerProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "",
            compKey: "group",
        };
    }

    getChartImg(): string | null {
        return null;
    }

    getController(): ClazzTemplate<GroupLayerController> | null {
        return null;
    }

    getInitConfig(): GroupLayerProps {
        return {
            base: {
                id: "",
                name: '分组图层',
                type: 'group',
            }
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return [
            {
                icon: AppstoreFilled,
                key: 'base',
                name: '基础',
            }
        ];
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
        };
    }

}