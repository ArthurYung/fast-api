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
    ${initCode || ""}
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

    // eslint-disable-next-line
    const fn = new Function(
      "$n",
      "$Mock",
      "$name",
      "_newTime",
      "_endTime",
      "_runError",
      "_uid",
      funStr
    );
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

  constructor() {
    this._api = [];
    this._id = 1;
    this._apiMap = {};
  }

  private _getId() {
    return ++this._id + "";
  }

  private _initBaseApiInfo(
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
      fn: () => {},
    };
  }

  public init(apiList: apiTemplateList[]) {
    apiList.forEach((templateList: apiTemplateList) => {
      const { __root__, ...baseTemplateList } = templateList;

      Object.keys(baseTemplateList).forEach((key: string) => {
        this.pushBaseApiInfo(baseTemplateList[key], key, __root__);
      });
    });
  }

  public pushBaseApiInfo(
    expression: string | undefined,
    key: string,
    __root__?: string
  ) {
    if (!expression) return;
    const apiInfo = this._initBaseApiInfo(expression, key, __root__);
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
      baseCode = loopInfo.code.replace(/<body>/, runtimeCode);
      initCode = (loopInfo.init || "") + initCode;
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

    this._api.push(apiInfo);
    this._apiMap[apiInfo.id] = apiInfo;
  }

  public getApiMenuList(): { name: string; id: string }[] {
    return this._api.map((apiInfo: BaseApiInfo) => {
      return {
        name: apiInfo.name,
        id: apiInfo.id,
      };
    });
  }

  public getApiInfo(id: string): BaseApiInfo {
    return this._apiMap[id];
  }

  public getDatabaseInfo(id: string): DatabaseCodeInfo {
    const { fn, ...databaseInfo } = this._apiMap[id];
    return databaseInfo;
  }
}

const interpreter = new Interpreter();

export default interpreter;
