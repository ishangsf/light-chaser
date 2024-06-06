import "./FilterList.less";
import { observer } from "mobx-react";
import filterManager from "../../manager/FilterManager.ts";
import AddFilterDialog from "./AddFilterDialog.tsx";
import { Layout, List, Popconfirm, theme } from "antd";
import { Help, Plus } from "@icon-park/react";
import PanelHeader from "../PanelHeader.tsx";
const { useToken } = theme;
export const FilterList = observer(() => {
  const { filters, setEditFilter, delFilter, setVisibility } = filterManager;
  const { token } = useToken();
  return (
    <>
      <Layout
        className="ComponentList dl-filter-list"
        style={{ height: "100%", overflow: "hidden", borderRight: `1px solid ${token.colorBorder}` }}
      >
        <PanelHeader title="全局过滤器">
          <Plus
            style={{ cursor: "pointer", marginRight: "10px" }}
            className="add"
            size={16}
            onClick={() => setVisibility(true)}
          />
        </PanelHeader>
        <Layout.Content className="dl-fl-body" style={{ height: "100%" }}>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={Object.values(filters)}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={() => {
                      setEditFilter(item);
                      setVisibility(true);
                    }}
                  >
                    编辑
                  </a>,
                  <Popconfirm
                    title="提示信息"
                    icon={<Help style={{ color: "red" }} />}
                    description="删除后无法撤销，确认删除嘛？"
                    onConfirm={() => delFilter(item.id)}
                    okText="是"
                    cancelText="否"
                  >
                    <span>删除</span>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          />
          {/* <div className={'dl-fl-body'}>
                    {
                        Object.values(filters).map((filter) => {
                            return (
                            <div className={'filter-item'} key={filter.id}>
                                <div className={'filter-name'}>{filter.name}</div>
                                <div className={'filter-operate'}>
                                    <span onClick={() => {
                                        setEditFilter(filter);
                                        setVisibility(true);
                                    }}>编辑</span>
                                    &nbsp;&nbsp;
                                    <Popconfirm title="提示信息"
                                                icon={<Help style={{color: 'red'}}/>}
                                                description="删除后无法撤销，确认删除嘛？"
                                                onConfirm={() => delFilter(filter.id)}
                                                okText="是"
                                                cancelText="否">
                                        <span>删除</span>
                                    </Popconfirm>
                                </div>
                            </div>
                            )
                        })
                    }
                </div> */}
        </Layout.Content>
      </Layout>
      {filterManager.visible && <AddFilterDialog />}
    </>
  );
});
