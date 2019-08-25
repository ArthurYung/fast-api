import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Content from "./Content";
import Tabs from "./CustomTab";

const Custom: React.FC<RouteComponentProps> = (props) => {
  const currentInfo = props.location.state;
  const [currTab, setCurrTab] = useState<string>("1");
  useEffect(() => {
    const currSearchMatch = props.location.search.match(/^\?type=(1|2)/);
    if (currSearchMatch) {
      if (currSearchMatch[1] !== currTab) {
        setCurrTab(currSearchMatch[1]);
      }
    }
  }, [props.location.search, currTab]);
  function changeTab(currentTab: string) {
    props.history.push({
      pathname: "/custom",
      search: "?type=" + currentTab,
    });
  }
  return (
    <div className="custom-box">
      <Tabs currentTab={currTab} changeTab={changeTab} />
      <Content currentTab={currTab} currentInfo={currentInfo} />
    </div>
  );
};

export default Custom;
