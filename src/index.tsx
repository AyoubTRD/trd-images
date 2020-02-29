import React from "react";
import ReactDOM from "react-dom";
import "./css/main.css";

import { App } from "./components/App";
import { Api } from "./classes/Api";

import { Remote } from "electron";

declare global {
  interface Window {
    api: Api;
    remote: Remote;
    fs: typeof import("fs");
    https: typeof import("https");
    wallpaper: typeof import("wallpaper");
  }
}

window.api = new Api("13386802-e2477028bad5f0a529756845c");

ReactDOM.render(<App />, document.getElementById("root"));
