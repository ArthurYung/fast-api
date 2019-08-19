import React from "react";
import { RouteWithSubRoutes } from "@/router/index";
import { RouterMap } from "@/router/types";
import Menu from "./Menu";
const Test = ({ routes }: { routes: RouterMap[] }) => {
  return (
    <div>
      <Menu />
      <div>
        {routes.map((route: RouterMap, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    </div>
  );
};
export default Test;
