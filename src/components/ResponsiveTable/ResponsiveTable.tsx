import {
  Box,
  Divider,
  Flex,
  Hide,
  Show,
  Table,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import axios from "axios";
import { TableHeader } from "../../models/Table";

interface Keyword {
  id: number;
  keyword: string;
  search_volume: number;
  competition: string;
  overall_score: number;
}

interface Option {
  value: string;
  label: string;
}

const HEADER_HEIGHT = 84;

const HeaderColumnMapper: any = {
  [TableHeader.competition]: (
    <Box fontSize="0.75rem" lineHeight="1rem" color="#7A7A7A" flex="1" p="3">
      {TableHeader.competition}
    </Box>
  ),
  [TableHeader.search_volume]: (
    <Box fontSize="0.75rem" lineHeight="1rem" color="#7A7A7A" flex="1" p="3">
      {TableHeader.search_volume}
    </Box>
  ),
  [TableHeader.overall_score]: (
    <Box fontSize="0.75rem" lineHeight="1rem" color="#7A7A7A" flex="1" p="3">
      {TableHeader.overall_score}
    </Box>
  ),
};

const BodyColumnMapper: any = {
  [TableHeader.competition]: (d: any) => (
    <Box height="2.3125rem" lineHeight="1rem" fontSize="0.75rem" flex="1" p="3">
      {d["competition"]}
    </Box>
  ),
  [TableHeader.search_volume]: (d: any) => (
    <Box height="2.3125rem" lineHeight="1rem" fontSize="0.75rem" flex="1" p="3">
      {d["search_volume"]}
    </Box>
  ),
  [TableHeader.overall_score]: (d: any) => (
    <Box height="2.3125rem" lineHeight="1rem" fontSize="0.75rem" flex="1" p="3">
      {d["overall_score"]}
    </Box>
  ),
};
export default function ResponsiveTable({ selectedColumn }: any) {
  const [data, setData] = React.useState(() => []);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:3004/keywords");
      setData(result.data);
      console.log(result);
    })();
  }, []);

  return (
    <Box h="full" overflow="hidden">
      <Box height="2.3125rem" boxSize="full" boxShadow="md">
        <Flex flexDirection="row">
          <Box
            fontSize="0.75rem"
            lineHeight="1rem"
            color="#7A7A7A"
            flex="3"
            p="3"
          >
            {TableHeader.keyword}
          </Box>
          <Show below="sm">{HeaderColumnMapper[selectedColumn]}</Show>
          <Hide below="sm">
            {HeaderColumnMapper[TableHeader.search_volume]}
            {HeaderColumnMapper[TableHeader.competition]}
            {HeaderColumnMapper[TableHeader.overall_score]}
          </Hide>
        </Flex>
      </Box>
      <Box
        w="full"
        overflowY="auto"
        h={`calc(100vh - ${HEADER_HEIGHT}px)`}
        scrollBehavior="smooth"
      >
        {data.map((d) => (
          <>
            <Flex flexDirection="row" key={d["id"]}>
              <Box
                height="2.3125rem"
                lineHeight="1rem"
                fontSize="0.75rem"
                flex="3"
                p="3"
              >
                {d["keyword"]}
              </Box>
              <Show below="sm">{BodyColumnMapper[selectedColumn](d)}</Show>
              <Hide below="sm">
                {BodyColumnMapper[TableHeader.search_volume](d)}
                {BodyColumnMapper[TableHeader.competition](d)}
                {BodyColumnMapper[TableHeader.overall_score](d)}
              </Hide>
            </Flex>
            <Divider />
          </>
        ))}
      </Box>
    </Box>
  );
}
