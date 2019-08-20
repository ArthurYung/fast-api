import baseCodeMap from "./baseCode";

const BASE_EXPRESSION_MATCH: RegExp = /(\<(.+?)\>)?(@(.+?):)?(api)?(\((.+?)\))?/;

function createBaseCode(
  expression: string,
  apiName: string,
  rootName: string
): {
  code: string;
  baseCode: string;
} {
  const matchResult: RegExpMatchArray | [] =
    expression.match(BASE_EXPRESSION_MATCH) || [];

  const loopName = matchResult[2] || "for";
  const rootApi = matchResult[4] || rootName;
  const api = matchResult[7];
  const param = matchResult[9];

  const baseCode = baseCodeMap["__" + loopName] || "";
  const runtimeCode = `${rootApi}${api ? "." + apiName : ""}${
    param ? "(" + param + ")" : ""
  }`;

  return {
    baseCode: baseCode.replace(/<body>/, runtimeCode),
    code: runtimeCode
  };
}

function createFunction(bodyCode: string): Function {
  const funStr = `let _timeId = _newTime($name, true)
    try {
      ${bodyCode}
    } finally {
      _endTime(_timeId)
    }
  `;
  return new Function("$n", "$name", "_newTime", "_endTime", funStr);
}

export { createBaseCode, createFunction };
// export default function(expression: string): Function {
//   const baseCode = createBaseCode(expression, "", "");
//   return createFunction(baseCode.baseCode);
// }
