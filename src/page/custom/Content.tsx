import React from "react";
import HistoryView from "@/components/HistoryView";
import Expression from "./Expression";
const CustomContent: React.FC<{ currentTab: string }> = ({ currentTab }) => {
  return (
    <div className="custom-content-main">
      <div className="custom-content-view">
        {currentTab === "1" ? <Expression /> : <span>test</span>}
      </div>
      <HistoryView />
    </div>
  );
};

export default CustomContent;
