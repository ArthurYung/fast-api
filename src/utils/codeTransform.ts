import { transformFromAstSync } from "@babel/core";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { isEmptyFunction } from "./transformCommon";

let _gid = 0;

function getGid() {
  return ++_gid + "";
}

function parseToAst(code: string) {
  const _gid = getGid();
  const ast = parse(code, { sourceType: "module" });
  traverse(ast, {
    Function(path) {
      if (isEmptyFunction(path)) return;
      console.log(path);
      const _tid = path.scope.generateUidIdentifier("tid");
      console.log(_tid);
    }
  });
  return ast;
}

export { parseToAst };
