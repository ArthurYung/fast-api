import React from "react";
import { RouterView } from "./router";
import Header from "./components/Header";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <RouterView HeaderComponent={Header} FooterComponent={Header} />
      </div>
    );
  }
}
