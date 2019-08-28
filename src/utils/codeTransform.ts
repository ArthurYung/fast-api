import { transformFromAstSync } from "@babel/core";
import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import { TransformInfo } from "./types";
import * as t from "@babel/types";
import {
  isEmptyFunction,
  findFunctionName,
  replaceFunction,
  shiftProgramBody
} from "./transformCommon";

interface ScopeInfo<T> {
  gid: string;
  tid: string;
  uid: t.Identifier;
  path: NodePath<T>;
}

type FuncNameMap = { [x: string]: string };

let _gid = 0;

function getGid() {
  return "code" + ++_gid;
}

function _parseToAst(
  code: string
): { id: string; ast: t.File; funcNameMap: FuncNameMap } {
  const gid = getGid();
  const funcNameMap: FuncNameMap = {};

  const ast = parse(code, { sourceType: "module" });
  traverse(ast, {
    Function(path) {
      if (isEmptyFunction(path)) return;
      const uid = path.scope.generateUidIdentifier("_uid");
      const tid = path.scope.generateUid("_tid");
      const name = findFunctionName(path);
      const scopeInfo: ScopeInfo<t.Function> = { gid, uid, tid, path };

      funcNameMap[tid] = name;

      replaceFunction(scopeInfo);
    }
  });

  traverse(ast, {
    enter(path) {
      if (path.isProgram()) {
        const uid = path.scope.generateUidIdentifier("_uid");
        const rootScopeInfo: ScopeInfo<t.Program> = {
          gid,
          uid,
          tid: gid,
          path
        };
        funcNameMap[gid] = "root";
        shiftProgramBody(rootScopeInfo);
        path.skip();
      }
    }
  });
  return {
    id: gid,
    ast,
    funcNameMap
  };
}

function getTransformCode(_code: string): TransformInfo {
  const { ast, id, funcNameMap } = _parseToAst(_code);
  const result = transformFromAstSync(ast);
  if (result) {
    return { id, code: result.code, nameMap: funcNameMap };
  }
  return { id, code: "", nameMap: funcNameMap };
}

export default getTransformCode;
