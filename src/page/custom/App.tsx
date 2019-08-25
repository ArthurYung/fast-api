import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Content from "./Content";
import Tabs from "./CustomTab";

const Custom: React.FC<RouteComponentProps> = (props) => {
  let currentTab = "1";
  let currSearchMatch = props.location.search.match(/^\?type=(1|2)/);
  const currentInfo = props.location.state;

  if (currSearchMatch) {
    currentTab = currSearchMatch[1];
  }
  return (
    <div className="custom-box">
      <Tabs />
      <Content currentTab={currentTab} currentInfo={currentInfo} />
    </div>
  );
};

export default Custom;
