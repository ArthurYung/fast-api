import React from "react";
import HistoryView from "@/components/HistoryView";

const CustomContent: React.FC<{ currentTab: string }> = ({ currentTab }) => {
  return (
    <div className="custom-content-main">
      <div className="custom-content-view">
        <div>Expression{currentTab === "1" ? "hehehe" : "hahaha"}</div>
      </div>
      <HistoryView />
    </div>
  );
};

export default CustomContent;
