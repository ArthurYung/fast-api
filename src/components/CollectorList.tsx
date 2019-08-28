import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { DatabaseItem } from "@/utils/types";
import { getAllData, putData } from "@/utils/indexDB";
import { dateFormat } from "@/utils/date";
import Delete from "@material-ui/icons/Delete";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
interface CollectorProps {
  replayCollect: (item: DatabaseItem) => void;
  deleteCollect: (item: DatabaseItem) => Promise<1 | 0>;
}

const CollectorList: React.FC<CollectorProps> = ({
  replayCollect,
  deleteCollect
}) => {
  const [collectorList, setCollectorList] = useState<DatabaseItem[]>([]);
  useEffect(() => {
    handleGetList();
  }, []);
  async function handleGetList() {
    const { data } = await getAllData();
    if (data) {
      const likedList = data.filter((item: DatabaseItem) => {
        return item.liked;
      });
      const unLikedList = data.filter((item: DatabaseItem) => {
        return !item.liked;
      });
      setCollectorList(likedList.concat(unLikedList));
    }
  }
  async function handleDelete(info: DatabaseItem) {
    const result = await deleteCollect(info);
    if (result !== 1) return;
    handleGetList();
  }
  async function handleLiked(collector: DatabaseItem) {
    collector.liked = !collector.liked;
    await putData(collector);
    await handleGetList();
  }
  return (
    <aside className="collector-box">
      <List>
        {collectorList.map((collector: DatabaseItem) => (
          <ListItem key={collector.id}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<StarBorder />}
                  checkedIcon={<Star />}
                  checked={collector.liked}
                  value="checkedH"
                />
              }
              label=""
              onClick={() => handleLiked(collector)}
            />
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
