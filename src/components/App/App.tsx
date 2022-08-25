import { Box, Heading, Flex } from "@chakra-ui/react";
import React, { SyntheticEvent } from "react";
import { TableHeader } from "../../models/Table";
import ColumnSelector from "../ColumnSelector";
import ResponsiveTable from "../ResponsiveTable";

function App() {
  const [selectedColumn, setSelectedColumn] = React.useState<string>(
    () => TableHeader.search_volume
  );

  const onChangeHandler = (event: SyntheticEvent) => {
    setSelectedColumn((event.target as HTMLSelectElement).value);
  };

  return (
    <Box>
      <Flex
        flexDirection="row"
        justifyItems="center"
        justifyContent="space-between"
        height="4.25rem"
      >
        <Heading py="4" ml="2">
          List of Keywords
        </Heading>
        <ColumnSelector onChangeHandler={onChangeHandler} />
      </Flex>
      <ResponsiveTable selectedColumn={selectedColumn} />
    </Box>
  );
}

export default App;
