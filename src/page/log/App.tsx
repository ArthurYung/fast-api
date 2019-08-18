import React from "react";
import { RouteWithSubRoutes } from "../../router";

export default (props: any) => {
  console.log(props.routes);
  return (
    <div>
      is Log
      <div>
        {props.routes.map((route: any, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    </div>
  );
};
