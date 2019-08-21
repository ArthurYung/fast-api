import React from "react";
import { RouterView } from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Progress from "./components/Progress";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className={"app"}>
          <HashRouter>
            <Progress />
            <Header />
            <main className={"layout-main"}>
              <RouterView />
            </main>
            <Footer />
          </HashRouter>
        </div>
      </Provider>
    );
  }
}
