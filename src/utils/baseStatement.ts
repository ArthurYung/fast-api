import loopCodeMap from "./loopCode";
import { BaseApiInfo, DatabaseCodeInfo } from "./types";
import { beginTimer, endTimer, runError } from "./baseTimer";
import Mock from "./mock";

const BASE_EXPRESSION_MATCH: RegExp = /^((.+?)\|)?(<(.+?)>)?(@(.+?):)?(api)?(\(\((.+?)\)\))?/;

function __createFunction(
  initCode: string,
  bodyCode: string,
  name: string,
  uid: string
): Function {
  return function(num: number) {
    const funStr = `
    try {
      ${initCode ? initCode.replace(/(let|const)/g, "var") : ""}
    } catch(e) {
      return {error: e.message}
    }

    let _timeId = _newTime($name, _uid)
    try {
      ${bodyCode || ""}
    } catch(e){
      _runError(_timeId, e.message)
    } finally {
      let _result = _endTime(_timeId)
      return _result
    }
  `;
    let fn: Function;
    try {
      // eslint-disable-next-line
      fn = new Function(
        "$n",
        "$mock",
        "$name",
        "_newTime",
        "_endTime",
        "_runError",
        "_uid",
        funStr
      );
    } catch (e) {
      return { error: e.message };
    }

    return fn(
      num,
      Mock,
      name + "(" + num + ")",
      beginTimer,
      endTimer,
      runError,
      uid
    );
  };
}

interface apiTemplateList {
  __root__?: string;
  [x: string]: string | undefined;
}

class Interpreter {
  public _api: BaseApiInfo[];
  public _id: number;
  public _apiMap: { [x: string]: BaseApiInfo };
  public _customApiMap: { [x: string]: BaseApiInfo };
  constructor() {
    this._api = [];
    this._id = 0;
    this._apiMap = {};
    this._customApiMap = {};
  }

  private _getId() {
    return ++this._id + "";
  }

  private _createBaseApiInfo(
    expression: string,
    key: string,
    root?: string
  ): BaseApiInfo {
    const uid = this._getId();
    return {
      root,
      id: uid,
      key,
      name: "",
      baseCode: "",
      initCode: "",
      loop: true,
      expression,
      type: 1,
      fn: () => {}
    };
  }

  public init(apiList: apiTemplateList[]) {
    apiList.forEach((templateList: apiTemplateList) => {
      const { __root__, ...baseTemplateList } = templateList;

      Object.keys(baseTemplateList).forEach((key: string) => {
        const apiInfo = this.getBaseApiInfo(
          baseTemplateList[key],
          key,
          __root__
        );
        this.pushBaseApiInfo(apiInfo);
      });
    });
  }
  pushBaseApiInfo(apiInfo?: BaseApiInfo) {
    if (!apiInfo) return;
    this._api.push(apiInfo);
    this._apiMap[apiInfo.id] = apiInfo;
  }
  public getBaseApiInfo(
    expression: string | undefined,
    key: string,
    __root__?: string
  ) {
    if (!expression) return;
    const apiInfo = this._createBaseApiInfo(expression, key, __root__);
    const expressionData = expression.match(BASE_EXPRESSION_MATCH) || [];

    const _beforeCode = expressionData[2];
    const _loopName = expressionData[4];
    const _defineRoot = expressionData[6] || __root__;
    const _isUsedApi = expressionData[7] && key;
    const _apiParams = expressionData[9];

    let runtimeStatement = [];
    let runtimeCode = "";
    let initCode = "";
    let baseCode = "";

    if (_defineRoot) {
      runtimeStatement.push(_defineRoot);
    }
    if (_isUsedApi) {
      runtimeStatement.push(_isUsedApi);
    }

    runtimeCode = runtimeStatement.join(".");

    if (_apiParams) {
      runtimeCode += `(${_apiParams})`;
    }

    if (_beforeCode) {
      initCode = _beforeCode;
    }

    if (_loopName) {
      const loopInfo = loopCodeMap["__" + _loopName];
      if (loopInfo) {
        baseCode = loopInfo.code.replace(/<body>/, runtimeCode);
        initCode = (loopInfo.init || "") + initCode;
      }
    } else {
      baseCode = runtimeCode;
    }

    const name = __root__
      ? __root__ === "window"
        ? key
        : [__root__, key].join(".")
      : key;

    const runtimeFn = __createFunction(initCode, baseCode, name, apiInfo.id);

    apiInfo.initCode = initCode;
    apiInfo.baseCode = baseCode;
    apiInfo.root = _defineRoot;
    apiInfo.name = name;
    apiInfo.fn = runtimeFn;
    return apiInfo;
  }

  public getApiMenuList(): { name: string; id: string }[] {
    return this._api.map((apiInfo: BaseApiInfo) => {
      return {
        name: apiInfo.name,
        id: apiInfo.id
      };
    });
  }

  public getApiInfo(id: string): BaseApiInfo {
    return this._apiMap[id];
  }

  public getDatabaseInfo(id: string): DatabaseCodeInfo {
    const apiInfo = this._apiMap[id] || this._customApiMap[id];
    const { fn, ...databaseInfo } = apiInfo;
    return databaseInfo;
  }

  public pushCustomApiInfo(info: BaseApiInfo) {
    const id = info.id;
    this._customApiMap[id] = info;
  }

  public createCustomInfo(
    baseCode: string,
    initCode: string = ""
  ): BaseApiInfo {
    const name = "Custom";
    const apiInfo = this._createBaseApiInfo("", name);
    apiInfo.initCode = initCode;
    apiInfo.baseCode = baseCode;
    apiInfo.type = 2;
    apiInfo.fn = __createFunction(initCode, baseCode, name, apiInfo.id);
    return apiInfo;
  }
}

const interpreter = new Interpreter();

export default interpreter;
