import { transformFromAstSync } from "@babel/core";
import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import { isEmptyFunction, findFunctionName, addId } from "./transformCommon";

let _gid = 0;
function getGid() {
  return ++_gid + "";
}

function _parseToAst(code: string) {
  const gid = getGid();
  const funcNameMap: { [x: string]: string } = {};
  const ast = parse(code, { sourceType: "module" });
  traverse(ast, {
    Function(path) {
      if (isEmptyFunction(path)) return;
      const uid = path.scope.generateUidIdentifier("_uid");
      const tid = path.scope.generateUid("_tid");
      const name = findFunctionName(path);
      const query: {
        gid: string;
        tid: string;
        uid: t.Identifier;
        path: NodePath<t.Function>;
      } = { gid, uid, tid, path };
      console.log(addId(query));
      // console.log(
      //   path
      //     .get("body")
      //     .get("body")
      //     .unshift(addId(query))
      // );
      (path.get("body") as any).unshiftContainer("body", addId(query));
      // console.log(path);
      funcNameMap[tid] = name;
      console.log();
    }
  });
  return ast;
}

function parseToAst(_code: string) {
  const ast = _parseToAst(_code);
  let reslt = transformFromAstSync(ast);
  console.log(reslt);
}

export { parseToAst };
