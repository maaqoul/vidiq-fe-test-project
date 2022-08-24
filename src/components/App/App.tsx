import { Box, Heading, Select, Flex, Show } from "@chakra-ui/react";
import React from "react";
import { TableHeader } from "../../models/Table";
import ResponsiveTable from "../ResponsiveTable";

function App() {
  const [selectedColumn, setSelectedColumn] = React.useState(
    () => TableHeader.search_volume
  );

  const onChangeHandler = ({ target }: any) => {
    setSelectedColumn(target.value);
  };

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
        <Show below="sm">
          <Box mr="5" py="2">
            <Select
              placeholder="Select option"
              borderRadius="6.25rem"
              onChange={onChangeHandler}
            >
              <option value={TableHeader.search_volume}>
                {TableHeader.search_volume}
              </option>
              <option value={TableHeader.competition}>
                {TableHeader.competition}
              </option>
              <option value={TableHeader.overall_score}>
                {TableHeader.overall_score}
              </option>
            </Select>
          </Box>
        </Show>
      </Flex>
      <ResponsiveTable selectedColumn={selectedColumn} />
    </Box>
  );
}

export default App;
