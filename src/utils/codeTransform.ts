import { transformFromAstSync } from "@babel/core";
import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import {
  isEmptyFunction,
  findFunctionName,
  startTime
} from "./transformCommon";

let _gid = 0;
function getGid() {
  return ++_gid + "";
}

function _parseToAst(code: string) {
  const gid = getGid();
  const funcNameMap: { [x: string]: string } = {};
  const ast = parse(code, { sourceType: "module" });
  const queue: any[] = [];
  traverse(ast, {
    Function(path: any) {
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
      console.log(path);
      const ffn = t.blockStatement([
        t.tryStatement(t.blockStatement(path.node.body.body))
      ]);
      console.log(ffn);
      // console.log(
      //   path
      //     .get("body")
      //     .get("body")
      //     .unshift(addId(query))
      // );
      console.log(path.get("body"));

      path.get("body").replaceWith(ffn);

      funcNameMap[tid] = name;
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
