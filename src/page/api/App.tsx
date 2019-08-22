import React from "react";
import { RouteWithSubRoutes } from "@/router/index";
import { RouterMap } from "@/router/types";
import Menu from "./Menu";
import interpreter from "@/utils/baseStatement";
import HistoryView from "@/components/HistoryView";
const MenuList = interpreter.getApiMenuList();

const Test = ({ routes }: { routes: RouterMap[] }) => {
  return (
    <div className={"api-box"}>
      <Menu menuList={MenuList} />
      <div className={"api-view"}>
        <div className={"api-context"}>
          {routes.map((route: RouterMap, i: number) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </div>
        <HistoryView />
      </div>
    </div>
  );
};
export default Test;
