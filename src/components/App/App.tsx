import { Box, Heading, Select, Flex, Show } from "@chakra-ui/react";
import ResponsiveTable from "../ResponsiveTable";

function App() {
  return (
    <Box>
      <Flex
        flexDirection="row"
        justifyItems="center"
        justifyContent="space-between"
        height="4.25rem"
      >
        <Heading py="4" ml="4">
          List of Keywords
        </Heading>
        <Show below="md">
          <Box mr="5" py="2">
            <Select placeholder="Select option" borderRadius="6.25rem">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
        </Show>
      </Flex>
      <ResponsiveTable />
    </Box>
  );
}

export default App;
