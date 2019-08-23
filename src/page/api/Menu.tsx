import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TripOrigin from "@material-ui/icons/TripOrigin";
import PlayArrow from "@material-ui/icons/PlayArrow";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface ApiMenuInfo {
  name: string;
  id: string;
}
interface MenuProps extends RouteComponentProps {
  menuList: ApiMenuInfo[];
}

const Menu: React.FC<MenuProps> = ({ history, menuList }: MenuProps) => (
  <div className={"api-menu"}>
    <List>
      {menuList.map(({ name, id }: ApiMenuInfo, i) => (
        <ListItem key={i} className={"api-menu-item"}>
          <TripOrigin />
          <ListItemText primary={name} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="action"
              onClick={() => history.push(`/api/${id}`)}
            >
              <PlayArrow />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </div>
);

export default withRouter(Menu);
