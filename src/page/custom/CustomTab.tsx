import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withRouter, RouteComponentProps } from "react-router-dom";

const CustomTabs: React.FC<RouteComponentProps> = (props) => {
  let currentTab = "1";
  let currSearchMatch = props.location.search.match(/^\?type=(1|2)/);
  if (currSearchMatch) {
    currentTab = currSearchMatch[1];
  }
  const [currTab, setCurrTab] = useState<string>(currentTab);

  function handleChange(e: any, value: string) {
    setCurrTab(value);
    props.history.push("/custom?type=" + value);
  }
  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      indicatorColor="primary"
      value={currTab}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      className="custom-content-tabs"
    >
      <Tab label="Expression" value="1" />
      <Tab label="Edit loop" value="2" />
    </Tabs>
  );
};

export default withRouter(CustomTabs);
