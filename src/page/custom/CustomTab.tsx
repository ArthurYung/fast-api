import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

interface TabsProps {
  currentTab: string;
  changeTab: (cur: string) => void;
}

const CustomTabs: React.FC<TabsProps> = ({ currentTab, changeTab }) => {
  console.log(currentTab);
  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      indicatorColor="primary"
      value={currentTab}
      onChange={(e: any, value) => changeTab(value)}
      aria-label="Vertical tabs example"
      className="custom-content-tabs"
    >
      <Tab label="Expression" value="1" />
      <Tab label="Edit loop" value="2" />
    </Tabs>
  );
};

export default CustomTabs;
