import React from "react";

import { match } from "react-router-dom";
import { ApiParams } from "@/router/types";

const Todo = ({ match }: { match: match<ApiParams> }) => {
  return <div>is todo: {match.params.name}</div>;
};

export default Todo;
