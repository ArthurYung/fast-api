import Mock from "mockjs";

function arr($n: number): any[] {
  return new Array($n);
}

function numArr($n: number): number[] {
  const array: number[] = [];
  for (let i = 0; i < $n; i++) {
    array.push(i);
  }
  return array;
}

function mock(type: string) {
  return Mock.mock(type);
}

function mockArr($n: number, type: string) {
  const array: any[] = [];
  for (let i = 0; i < $n; i++) {
    array.push(mock(type));
  }
}

function element(tagName: string, num?: number) {
  if (!num) {
    return document.createElement(tagName);
  }
  const elem = [];
  for (let i = 0; i < num; i++) {
    elem.push(document.createElement(tagName));
  }
  return elem;
}

type MockObjType = {
  [x: string]: "string" | "number" | "boolean" | "function" | "name" | "time";
};

function mockObj(obj: MockObjType) {
  const mockData: any = {};
  Object.keys(obj).forEach((key: string) => {
    switch (obj[key]) {
      case "string":
        mockData[key] = Mock.mock({ "string|1-10": "abc" });
        break;
      case "number":
        mockData[key] = Mock.mock({ "number|10-100000": 10 });
        break;
      case "boolean":
        mockData[key] = Mock.mock({ "boolean|1-2": true });
        break;
      case "function":
        mockData[key] = () => {};
        break;
      case "name":
        mockData[key] = Mock.mock("@cname");
        break;
      case "time":
        mockData[key] = Mock.mock("@time");
      // eslint-disable-next-line
      default:
        break;
    }
    return mockData;
  });
}

function objArr($n: number, obj: MockObjType) {
  const array = [];
  for (let i = 0; i < $n; i++) {
    array.push(mockObj(obj));
  }
  return array;
}

export default {
  arr,
  numArr,
  mockArr,
  objArr,
  mock,
  ele: element
};
