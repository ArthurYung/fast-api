import React from "react";
import { RouteWithSubRoutes } from "@/router/index";
import { RouterMap } from "@/router/types";
import Menu from "./Menu";
import interpreter from "@/utils/baseStatement";

const MenuList = interpreter.getApiMenuList();

const Test = ({ routes }: { routes: RouterMap[] }) => {
  return (
    <div className={"api-box"}>
      <Menu menuList={MenuList} />
      <div className={"api-view"}>
        {routes.map((route: RouterMap, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    </div>
  );
};
export default Test;
