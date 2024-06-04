import { theme } from "antd";
import {action, makeObservable, observable} from "mobx";

class ThemeStore {

    constructor() {
        makeObservable(this, {
            themeConfig: observable,
            setThemeConfig: action,
        })
    }
    themeConfig: any = {
      token: {
          colorBgLayout: 'rgb(31,31,31)',
          colorBorder: 'rgb(64,64,64)'
      },
      algorithm: [theme.darkAlgorithm]
    };

    setThemeConfig = (themeConfig: any) => {
        this.themeConfig = themeConfig;
    }

}

const themeConfigStore = new ThemeStore();
export default themeConfigStore;