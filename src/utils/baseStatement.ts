import baseCodeMap from "./baseCode";

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
    } finally {
      _endTime(_timeId)
    }
  `;
  // eslint-disable-next-line
  const fn = new Function("$n", "$name", "_newTime", "_endTime", funStr);
  return function(num: number) {
    fn(num, name);
  };
}

interface BaseApiInfo {
  name: string;
  fn: Function;
  baseCode: string;
  initCode: string;
  loop: boolean;
  root: string | undefined;
  id: number;
  key: string;
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
      const result = this.createBaseCode(api[key] as string, key, __root__);
      const currApiInfo: BaseApiInfo = {
        ...result,
        id: this._id,
        key
      };

      this._api.push(currApiInfo);
      this._apiMap[this._id] = currApiInfo;
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

    const initCode = matchResult[2];
    const loopName = matchResult[4];
    const api = matchResult[7];
    const param = matchResult[9];
    const rootApi = matchResult[6] || rootName;
    const root = rootApi === "empty" ? "" : rootApi;
    const runtimeCode = `${root}${api ? "." + apiName : ""}${
      param ? "(" + param + ")" : ""
    }`;
    let baseCode: string;
    let loop = loopName !== "empty";

    if (loop) {
      const loopCode = baseCodeMap["__" + (loopName || "for")] || "";
      baseCode = loopCode.replace(/<body>/, runtimeCode);
    } else {
      baseCode = runtimeCode;
    }
    let name =
      root && !["window", "empty"].includes(root)
        ? `${root}.${apiName}`
        : apiName;

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
