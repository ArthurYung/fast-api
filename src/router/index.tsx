import React, { Suspense, lazy } from "react";
import { Route, HashRouter } from "react-router-dom";
import { RouterMap } from "./types";

const routes: RouterMap[] = [
  {
    path: "/",
    component: lazy(() => import("../page/home/App")),
  },
  {
    path: "/log",
    component: lazy(() => import("../page/log/App")),
    routes: [],
  },
  {
    path: "/api",
    component: lazy(() => import("../page/api/App")),
    routes: [
      {
        path: "/api/:test",
        component: lazy(() => import("../page/api/Todo")),
      },
    ],
  },
];

function RouteWithSubRoutes(route: RouterMap) {
  return (
    <Route
      path={route.path}
      render={(props: any) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const RouterView: React.FC = () => (
  <HashRouter>
    <Suspense fallback={<div>loading...</div>}>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={i} {...route} />;
      })}
    </Suspense>
  </HashRouter>
);
export { RouterView, RouteWithSubRoutes };
