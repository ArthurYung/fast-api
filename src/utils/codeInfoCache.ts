import { DatabaseCodeInfo } from "./types";
type CatchItem = {
  baseInfo: DatabaseCodeInfo;
  nameMap: NameMapCache;
};
type NameMapCache = { [x: string]: string };
const CodeInfoCache: { [x: string]: CatchItem } = {};

function setCodeInfoCache(baseInfo: DatabaseCodeInfo, nameMap: NameMapCache) {
  CodeInfoCache[baseInfo.id] = { baseInfo: baseInfo, nameMap };
}
function delCodeInfoCache(id: string) {
  delete CodeInfoCache[id];
}

function getCodeInfoCache(id: string) {
  return CodeInfoCache[id].baseInfo;
}

function getNameMapCache(id: string) {
  return CodeInfoCache[id].nameMap;
}

function getCodeInfoName(id: string, key: string) {
  const codeInfo = getNameMapCache(id);
  if (codeInfo) {
    return codeInfo[key] || key;
  }
  return key;
}

export {
  setCodeInfoCache,
  delCodeInfoCache,
  getCodeInfoCache,
  getCodeInfoName
};
