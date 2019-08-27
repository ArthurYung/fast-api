import { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

function isEmptyFunction(path: NodePath<t.Function>): boolean {
  const node: any = path.get("body").node;
  if (node.body) {
    return !node.body.length;
  }
  return false;
}

function findFunctionName(path: any): string {
  const parentNode = path.parentPath.node;
  let functionName = "";

  if (parentNode.type === "AssignmentExpression") {
    functionName = parentNode.left.property.name;
  } else if (parentNode.type === "VariableDeclarator") {
    functionName = parentNode.id.name;
  } else if (parentNode.type === "CallExpression") {
    functionName = parentNode.callee.name + "<CallBack>";
  } else {
    functionName = path.node.id ? path.node.id.name : "anonymous";
  }

  return functionName;
}

function startTime(query: {
  gid: string;
  tid: string;
  uid: t.Identifier;
  path: NodePath<t.Function>;
}) {
  var result = t.variableDeclaration("var", [
    t.variableDeclarator(
      query.uid,
      t.callExpression(t.identifier("__start"), [
        t.stringLiteral(query.gid),
        t.stringLiteral(query.tid)
      ])
    )
  ]);
  return result;
}

export { isEmptyFunction, findFunctionName, startTime };
