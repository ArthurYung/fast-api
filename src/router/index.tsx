import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import { RouterMap } from "./types";

const routes: RouterMap[] = [
  {
    path: "/",
    component: lazy(() => import("../page/home/App"))
  },
  {
    path: "/api",
    component: lazy(() => import("../page/api/App")),
    routes: [
      {
        path: "/api/:id",
        component: lazy(() => import("../page/api/View"))
      }
    ]
  }
];

function RouteWithSubRoutes(route: RouterMap) {
  return (
    <Route
      exact={route.path === "/"}
      path={route.path}
      render={(props: any) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const RouterView: React.FC = () => (
  <Suspense fallback={<div>loading...</div>}>
    {routes.map((route, i) => {
      return <RouteWithSubRoutes key={i} {...route} />;
    })}
  </Suspense>
);

export { RouterView, RouteWithSubRoutes };
