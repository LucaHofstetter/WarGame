import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./styles.css";

import WarGameComponent from "./WarGameComponent";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(<WarGameComponent />);
