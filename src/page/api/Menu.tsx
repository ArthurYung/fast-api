import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TripOrigin from "@material-ui/icons/TripOrigin";
import PlayArrow from "@material-ui/icons/PlayArrow";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface MenuProps extends RouteComponentProps {
  menuList: [];
}

const Menu: React.FC<RouteComponentProps> = ({ history, menuList }) => (
  <div className={"api-menu"}>
    <List>
      <ListItem>
        <TripOrigin />
        <ListItemText primary="Single-line item" />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="action"
            onClick={() => history.push("/api/ttt3")}
          >
            <PlayArrow />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <TripOrigin />

        <ListItemText primary="Single-line item" />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="action"
            onClick={() => history.push("/api/test1")}
          >
            <PlayArrow />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </div>
);

export default withRouter(Menu);
