import React, { Component } from "react";
import { Provider } from "react-redux";

import Intro from "./Containers/Intro/Intro";
import Layout from './Containers/Layout/Layout';
import store from "./store";
import SvgIcons from './Containers/SvgIcons/SvgIcons';

import './App.css';


class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <div className="App grid-container">

          <header className="App-header">
            <Intro/>
          </header>

          <main className="App-main">
            <Layout/>
          </main>

          <footer className="App-footer">
            <SvgIcons/>
            All rights reserved
          </footer>

        </div>
      </Provider>
    )
  }
}

export default App;
