const __for = {
  code: `for (let i = 0; i < $n; i++) {
  <body>
}`,
};
const __for_less = {
  code: `for (let i = $n - 1; i >= 0; i--) {
  <body>
}`,
};
const __while = {
  code: `let i = 0; 
while(i < $n) {
  i++; 
  <body>
}`,
};
const __while_less = {
  code: `let i = $n;
while(i--){
  <body>
}`,
};
const __forEach = {
  init: `let $Array = $mock.arr($n)`,
  code: `$Array.forEach((_,$i) => {
  <body>
})`,
};
const __map = {
  init: `let $Array = $mock.arr($n)`,
  code: `$Array.map((_,$i) => {
  <body>
})`,
};

const __reduce = {
  init: `let $Array = $mock.numArr($n)`,
  code: `$Array.reduce(($pre, $cur) => {
  <body>
}, 0)`,
};

interface baseCode {
  init?: string;
  code: string;
}
const BaseCodeMap: { [x: string]: baseCode } = {
  __for,
  __for_less,
  __while,
  __while_less,
  __forEach,
  __map,
  __reduce,
};

export default BaseCodeMap;
