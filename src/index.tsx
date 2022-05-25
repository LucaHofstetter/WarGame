import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import WarGameComponent from "./WarGameComponent";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <WarGameComponent />
  </StrictMode>
);
