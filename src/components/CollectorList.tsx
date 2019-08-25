import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { DatabaseItem } from "@/utils/types";
import { getAllData } from "@/utils/indexDB";
import { dateFormat } from "@/utils/date";
import Delete from "@material-ui/icons/Delete";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";

interface CollectorProps {
  replayCollect: (item: DatabaseItem) => void;
  deleteCollect: (item: DatabaseItem) => Promise<1 | 0>;
}

const CollectorList: React.FC<CollectorProps> = ({
  replayCollect,
  deleteCollect,
}) => {
  const [collectorList, setCollectorList] = useState<DatabaseItem[]>([]);
  useEffect(() => {
    getAllData().then((data) => {
      setCollectorList(data.data);
    });
  }, []);
  async function handleDelete(info: DatabaseItem) {
    const result = await deleteCollect(info);
    if (result !== 1) return;
    const { data } = await getAllData();
    if (data) setCollectorList(data);
  }
  return (
    <aside className="collector-box">
      <List>
        {collectorList.map((collector: DatabaseItem) => (
          <ListItem key={collector.id}>
            <ListItemText
              primary={collector.timerInfo.name}
              secondary={dateFormat(collector.timerInfo.date)}
            />
            <IconButton
              edge="end"
              aria-label="play"
              onClick={() => replayCollect(collector)}
            >
              <PlayCircleFilled />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(collector)}
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </aside>
  );
};

export default CollectorList;
