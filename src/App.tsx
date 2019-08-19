import React from "react";
import { RouterView } from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { HashRouter } from "react-router-dom";
export default class App extends React.Component {
  render() {
    return (
      <div className={"app"}>
        <HashRouter>
          <Header />
          <main className={"layout-main"}>
            <RouterView />
          </main>
          <Footer />
        </HashRouter>
      </div>
    );
  }
}
