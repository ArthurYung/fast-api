import React from "react";
import HistoryView from "@/components/HistoryView";
import Expression from "./Expression";
import EditLoop from "./EditLoop";
interface CustomContent {
  currentTab: string;
}

const CustomContent: React.FC<CustomContent> = ({ currentTab }) => {
  return (
    <div className="custom-content-main">
      <div className="custom-content-view">
        {currentTab === "1" ? <Expression /> : <EditLoop />}
      </div>
      <HistoryView />
    </div>
  );
};

export default CustomContent;
