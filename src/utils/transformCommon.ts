import { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

interface QueryInfo {
  gid: string;
  tid: string;
  uid: t.Identifier;
}

interface TransformInfo<T> extends QueryInfo {
  path: NodePath<T>;
}

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

const startTime = (query: QueryInfo) => {
  var result = t.variableDeclaration("var", [
    t.variableDeclarator(
      query.uid,
      t.callExpression(t.identifier("__start"), [
        t.stringLiteral(query.tid),
        t.stringLiteral(query.gid),
      ])
    ),
  ]);
  return result;
};

const endTime = (query: QueryInfo) => {
  var result = t.expressionStatement(
    t.callExpression(t.identifier("__end"), [
      t.stringLiteral(query.tid),
      t.stringLiteral(query.gid),
      query.uid,
    ])
  );

  return result;
};

const createNewStatement = (
  start: t.Statement,
  end: t.Statement,
  body: t.Statement[] = []
) => {
  const BlockStatement = t.blockStatement([
    start,
    t.tryStatement(t.blockStatement(body), null, t.blockStatement([end])),
  ]);
  return BlockStatement;
};

function replaceFunction({ gid, tid, uid, path }: TransformInfo<t.Function>) {
  const startStatement = startTime({ gid, tid, uid });
  const endStatement = endTime({ gid, tid, uid });
  const newStatementBody = createNewStatement(
    startStatement,
    endStatement,
    (path.node.body as any).body
  );
  path.get("body").replaceWith(newStatementBody);
}

function shiftProgramBody({ gid, tid, uid, path }: TransformInfo<t.Program>) {
  const startStatement = startTime({ gid, tid, uid });
  const endStatement = endTime({ gid, tid, uid });
  (path as any).unshiftContainer("body", startStatement);
  (path as any).pushContainer("body", endStatement);
}

export { isEmptyFunction, findFunctionName, replaceFunction, shiftProgramBody };
