import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "@/logic";
import { MODE_DEV_MOCK } from "@/config";

async function main() {
  if (MODE_DEV_MOCK) {
    (await import("@/mock")).default();
  }

  ReactDOM.render(
    <StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </StrictMode>,
    document.getElementById("root")
  );
}

main();
