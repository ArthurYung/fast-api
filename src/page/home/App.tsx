import React from "react";
import homeConnect from "@/container/home";

const App = (props: any) => {
  console.log(props);
  return (
    <div>
      {props.test[0]}
      <span>is new App or old</span>
      <button onClick={() => props.add()} />
    </div>
  );
};

export default homeConnect(App);
