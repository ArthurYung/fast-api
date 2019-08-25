import React from "react";
import HistoryView from "@/components/HistoryView";
import Expression from "./Expression";
import EditLoop from "./EditLoop";
import { BaseApiInfo } from "@/utils/types";
interface CustomContent {
  currentTab: string;
  currentInfo?: BaseApiInfo;
}

const CustomContent: React.FC<CustomContent> = ({
  currentTab,
  currentInfo,
}) => {
  return (
    <div className="custom-content-main">
      <div className="custom-content-view">
        {currentTab === "1" ? (
          <Expression currentInfo={currentInfo} />
        ) : (
          <EditLoop currentInfo={currentInfo} />
        )}
      </div>
      <HistoryView />
    </div>
  );
};

export default CustomContent;
