import React from "react";
import { RouteWithSubRoutes } from "@/router/index";
import { RouterMap } from "@/router/types";
import Menu from "./Menu";
// import { Loops } from "@/template/api";
// import createBaseCode from "@/utils/baseStatement";

// const test = createBaseCode(Loops.forEach);
// console.log(test);
// test(50000);
const MENU_MAP = ["api1", "api1.api2", "api2.api3", "api3"];

const Test = ({ routes }: { routes: RouterMap[] }) => {
  return (
    <div>
      <Menu menuList={MENU_MAP} />
      <div>
        {routes.map((route: RouterMap, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    </div>
  );
};
export default Test;
