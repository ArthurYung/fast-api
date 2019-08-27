import { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

function isEmptyFunction(path: NodePath<t.Function>): boolean {
  const node: any = path.get("body").node;
  if (node.body) {
    return !node.body.length;
  }
  return false;
}

export { isEmptyFunction };
