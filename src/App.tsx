import React from "react";
import { RouterView } from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import apiInterpreter from "./utils/baseStatement";
import { Loops } from "./template/api";
import reducer from "./reducer";

apiInterpreter.init([Loops]);
const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className={"app"}>
          <HashRouter>
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
