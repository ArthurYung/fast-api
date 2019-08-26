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
  const defaultTabId = menuList[0].id;
  const [value, setValue] = useState(defaultTabId);

  useEffect(() => {
    const matchId = location.pathname.match(apiPathMatch);
    if (!matchId) {
      history.replace("/api/" + defaultTabId);
    } else {
      setValue(matchId[1]);
    }
  }, [location.pathname, history, defaultTabId, apiPathMatch]);

  function handleChange(e: any, value: string) {
    history.push("/api/" + value);
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
