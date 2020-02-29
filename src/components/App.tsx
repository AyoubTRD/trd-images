import React from "react";

import {BrowserRouter, Route} from "react-router-dom";
import { AnimatedSwitch } from "./AnimatedSwitch";

import {Home} from "./Home/Home";

export class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <AnimatedSwitch animationClassName="slide-right" animationTimeout={800}>
          <Route exact path="/">
            <Home />
          </Route>
        </AnimatedSwitch>
      </BrowserRouter>
    )
  }
}