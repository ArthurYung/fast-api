import baseCodeMap from "./baseCode";
import { BaseApiInfo } from "./types";
import { beginTimer, endTimer } from "./timer";
const BASE_EXPRESSION_MATCH: RegExp = /^((.+?)\|)?(<(.+?)>)?(@(.+?):)?(api)?(\((.+?)\))?/;

function createFunction(
  initCode: string,
  bodyCode: string,
  name: string
): Function {
  const funStr = `
    ${initCode || ""}
    let _timeId = _newTime($name, true)
    try {
      ${bodyCode || ""}
    } catch(e){
      _endTime(_timeId, true)
    } finally {
      let _result = _endTime(_timeId)
      return _result
    }
  `;
  console.log(funStr);
  // eslint-disable-next-line
  const fn = new Function("$n", "$name", "_newTime", "_endTime", funStr);
  return function(num: number) {
    return fn(num, name + "(" + num + ")", beginTimer, endTimer);
  };
}

interface apiTemplate {
  __root__?: string;
  [x: string]: string | undefined;
}

class Interpreter {
  public _api: BaseApiInfo[];
  public _id: number;
  public _apiMap: { [x: number]: BaseApiInfo };
  constructor() {
    this._api = [];
    this._id = 1;
    this._apiMap = {};
  }

  public init(apiList: apiTemplate[]) {
    apiList.forEach((template: apiTemplate) => {
      this.pushBaseApiInfo(template);
    });
  }

  public pushBaseApiInfo(apiInfo: apiTemplate) {
    const { __root__, ...api } = apiInfo;
    Object.keys(api).forEach((key: string) => {
      const id = this._id;
      const result = this.createBaseCode(api[key] as string, key, __root__);
      const currApiInfo = { ...result } as BaseApiInfo;

      currApiInfo.id = id;
      currApiInfo.key = key;
      currApiInfo.expression = api[key];

      this._api.push(currApiInfo);
      this._apiMap[id] = currApiInfo;
      this._id++;
    });
  }

  public createBaseCode(
    expression: string,
    apiName: string,
    rootName?: string
  ) {
    const matchResult: RegExpMatchArray =
      expression.match(BASE_EXPRESSION_MATCH) || [];

    const init = matchResult[2];
    const loopName = matchResult[4];
    const api = matchResult[7];
    const param = matchResult[9];
    const rootApi = matchResult[6] || rootName;
    const root = rootApi === "empty" ? "" : rootApi;

    let baseCode: string;
    let name = apiName;
    let loop = loopName !== "empty";
    let runtimeCode = "" + root;
    let initCode = init;
    if (api) {
      runtimeCode += root ? `.${apiName}` : apiName;
    }
    if (param) {
      runtimeCode += `(${param})`;
    }

    if (loop) {
      const loopCode = baseCodeMap["__" + (loopName || "for")] || { code: "" };
      baseCode = loopCode.code.replace(/<body>/, runtimeCode);
      if (loopCode.init) {
        initCode = loopCode.init + (init || "");
      }
    } else {
      baseCode = runtimeCode;
    }

    if (root && !["window", "empty"].includes(root)) {
      name = `${root}.${apiName}`;
    }

    let fn = createFunction(initCode, baseCode, name);

    return {
      fn,
      initCode,
      baseCode,
      loop,
      root,
      name
    };
  }

  public getApiMenuList(): { name: string; id: number }[] {
    return this._api.map((apiInfo: BaseApiInfo) => {
      return {
        name: apiInfo.name,
        id: apiInfo.id
      };
    });
  }

  public getApiInfo(id: number): BaseApiInfo {
    return this._apiMap[id];
  }
}

const interpreter = new Interpreter();

export default interpreter;
