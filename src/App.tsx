import React from "react";
import { RouterView } from "./router";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>is header</div>
        <RouterView />
      </div>
    );
  }
}
