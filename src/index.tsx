import { createRoot } from "react-dom/client";
import { QueryStoreProvider } from "applesauce-react";
import "window.nostr.js";

import "./index.css";
import App from "./App.tsx";
import { queryStore } from "./core";

createRoot(document.getElementById("root")!).render(
  <QueryStoreProvider store={queryStore}>
    <App />
  </QueryStoreProvider>,
);
