import { Box, Divider, Flex, Hide, Show } from "@chakra-ui/react";
import React, { ReactNode, useEffect } from "react";
import { HEADER_HEIGHT } from "../../Constants";
import { Keyword } from "../../models/Keyword";

import { TableHeader } from "../../models/Table";
import { getKeywords } from "../../services/api";
import ResponsiveTableHeader from "./ResponsiveTableHeader";

type BodyColumn = {
  [key: string | number | symbol]: (k: Keyword) => ReactNode;
};
interface Props {
  selectedColumn: string;
}

const BodyColumnMapper: BodyColumn = {
  [TableHeader.competition]: (keyword: Keyword) => (
    <Box height="2.3125rem" lineHeight="1rem" fontSize="0.75rem" flex="1" p="3">
      {keyword.competition}
    </Box>
  ),
  [TableHeader.search_volume]: (keyword: Keyword) => (
    <Box height="2.3125rem" lineHeight="1rem" fontSize="0.75rem" flex="1" p="3">
      {keyword.search_volume}
    </Box>
  ),
  [TableHeader.overall_score]: (keyword: Keyword) => (
    <Box height="2.3125rem" lineHeight="1rem" fontSize="0.75rem" flex="1" p="3">
      {keyword.overall_score}
    </Box>
  ),
};

export default function ResponsiveTable({
  selectedColumn,
}: Props): JSX.Element {
  const [keywords, setKeywords] = React.useState<Keyword[]>(() => []);

  useEffect(() => {
    (async () => {
      const result = await getKeywords();
      setKeywords(result);
    })();
  }, []);

  return (
    <Box h="full" overflow="hidden">
      <ResponsiveTableHeader selectedColumn={selectedColumn} />
      <Box
        w="full"
        overflowY="auto"
        h={`calc(100vh - ${HEADER_HEIGHT}px)`}
        scrollBehavior="smooth"
      >
        {keywords.map((keyword) => (
          <Box key={keyword.id}>
            <Flex flexDirection="row">
              <Box
                height="2.3125rem"
                lineHeight="1rem"
                fontSize="0.75rem"
                flex="3"
                p="3"
              >
                {keyword.keyword}
              </Box>
              <Show below="sm">
                {BodyColumnMapper[selectedColumn](keyword)}
              </Show>
              <Hide below="sm">
                {BodyColumnMapper[TableHeader.search_volume](keyword)}
                {BodyColumnMapper[TableHeader.competition](keyword)}
                {BodyColumnMapper[TableHeader.overall_score](keyword)}
              </Hide>
            </Flex>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
