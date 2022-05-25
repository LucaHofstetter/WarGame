import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import Game from "./Game";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);
