import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
