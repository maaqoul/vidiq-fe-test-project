import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import theme from "../../customTheme";
import ResponsiveTable from "../ResponsiveTable";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <div>List of Keywords</div>
      <ResponsiveTable />
    </ChakraProvider>
  );
}

export default App;
