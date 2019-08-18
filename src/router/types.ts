export type RouterMap = {
  path: string;
  component: React.FC<any>;
  routes?: RouterMap[];
};

export type ApiParams = {
  name: string;
};
