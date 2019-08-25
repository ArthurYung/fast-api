import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface ApiMenuInfo {
  name: string;
  id: string;
}
interface MenuProps extends RouteComponentProps {
  menuList: ApiMenuInfo[];
  location: any;
}

const Menu: React.FC<MenuProps> = ({ history, menuList, location }) => {
  const apiPathMatch = /^\/api\/(\d+)/;
  let currentTabId = menuList[0].id;

  const matchId = location.pathname.match(apiPathMatch);
  if (matchId) {
    currentTabId = matchId[1];
  }
  console.log(currentTabId);
  const [value, setValue] = useState(currentTabId);
  useEffect(() => {
    if (!matchId) {
      history.replace("/api/" + currentTabId);
    }
  }, [location, history, currentTabId, matchId]);

  function handleChange(e: any, value: string) {
    history.push("/api/" + value);
    setValue(value);
  }
  return (
    <div className={"api-menu"}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        {menuList.map(({ name, id }: ApiMenuInfo, i) => (
          <Tab key={id} label={name} value={id} />
        ))}
      </Tabs>
    </div>
  );
};

export default withRouter(Menu);
