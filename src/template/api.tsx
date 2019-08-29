const Loops = {
  for: "<for>",
  for_less: "<for_less>",
  while: "<while>",
  while_less: "<while_less>",
  forEach: "<forEach>",
  map: "<map>",
  reduce: "<reduce>"
};

const Element = {
  __root__: "$element",
  appendChild: 'let doms = $mock.ele("span", $n)|<for>api(doms[i])',
  removeChild:
    'let doms = $mock.ele("div", $n);doms.forEach(dom=>$element.appendChild(dom))|<for>api(doms[i])',
  innerHTML: '<for>@$element.innerHTML="<div>1</div>":',
  getAttribute: '<for>@$element:api("id")',
  setAttribute: '<for>@$element:api("class", "test")'
};

const ArRay = {
  __root__: "Array",
  isArray: "let test = []|<for>api(test)",
  form: "<for>api(i)",
  of: "<for>api(i)",
  copyWithin: "let $array = [1,2,3]|<for>@$array:api(1,2)",
  sort: "let $array = [1, 30, 4, 21, 100000]|<for>@$array:api(undefined)",
  push: "let $array = []|<for>@$array:api(i)",
  concat: "let $array = []|<for>@$array:api([i])",
  shift: "let $array = $mock.arr($n)|<for>@$array:api(undefined)",
  unshift: "let $array = []|<for>@$array:api(i)",
  includes: "let $array = $mock.numArr($n)|<for>@$array:api(i)",
  indexOf: "let $array = $mock.numArr($n)|<for>@$array:api(i)"
};

const Json = {
  __root__: "JSON",
  parse: `let json = '{"result":true, "count":42}'|<for>api(json)`,
  stringify: `let json = {"result":true, "count":42}|<for>api(json)`
};

export { Loops, Element, Json, ArRay };
