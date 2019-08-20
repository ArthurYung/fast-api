const __for = "for(let i = 0; i < $n; i++){<body>}";
const __for_less = "for(let i = $n - 1; i >= 0; i--){<body>}";
const __while = "let i = 0; while(i < $n) {i++; <body>}";
const __while_less = "let i = $n;while(i--){<body>}";
const __foEach = "new Array($n).forEach((_,$i)=>{<body>})";
const __map = "new Array($n).map((_,$i)=>{<body>})";

interface baseCode {
  [x: string]: string;
}
const BaseCodeMap: baseCode = {
  __for,
  __for_less,
  __while,
  __while_less,
  __foEach,
  __map
};

export default BaseCodeMap;
