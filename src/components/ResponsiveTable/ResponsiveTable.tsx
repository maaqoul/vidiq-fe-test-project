import {
  Box,
  Divider,
  Flex,
  Hide,
  Table,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import axios from "axios";

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

enum TableHeader {
  keyword = "Keyword",
  competition = "Competition",
  overall_score = "Overall Score",
  search_volume = "Search Volume",
}

const tableHeaders = [
  TableHeader.keyword,
  TableHeader.competition,
  TableHeader.overall_score,
  TableHeader.search_volume,
];

export default function DataTable() {
  const [data, setData] = React.useState(() => []);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:3004/keywords");
      setData(result.data);
      console.log(result);
    })();
  }, []);

  return (
    <Box h="full">
      <Box
        mb="2"
        height="2.3125rem"
        pos="relative"
        boxSize="full"
        position="sticky"
        boxShadow="md"
      >
        <Flex
          flexDirection="row"
          justifyItems="center"
          alignContent="center"
          align="center"
        >
          <Box
            width="31rem"
            fontSize="0.75rem"
            lineHeight="1rem"
            color="#7A7A7A"
            ml="4"
          >
            {TableHeader.keyword}
          </Box>
          <Box
            width="10.5rem"
            fontSize="0.75rem"
            lineHeight="1rem"
            color="#7A7A7A"
          >
            {TableHeader.search_volume}
          </Box>
          <Hide below="md">
            <Box
              width="10.5rem"
              fontSize="0.75rem"
              lineHeight="1rem"
              color="#7A7A7A"
            >
              {TableHeader.competition}
            </Box>
          </Hide>
          <Hide below="md">
            <Box
              width="10.5rem"
              fontSize="0.75rem"
              lineHeight="1rem"
              color="#7A7A7A"
            >
              {TableHeader.overall_score}
            </Box>
          </Hide>
        </Flex>

        <Divider boxShadow="md" mt="2" />
      </Box>
      <Box ml="4" overflowY="auto" maxH="32rem" scrollBehavior="smooth">
        {data.map((d) => (
          <>
            <Flex flexDirection="row" key={d["id"]}>
              <Box
                width="31rem"
                height="2.3125rem"
                lineHeight="1rem"
                fontSize="0.75rem"
              >
                {d["keyword"]}
              </Box>
              <Box
                width="10.5rem"
                height="2.3125rem"
                lineHeight="1rem"
                fontSize="0.75rem"
              >
                {d["search_volume"]}
              </Box>
              <Hide below="md">
                <Box
                  width="10.5rem"
                  height="2.3125rem"
                  lineHeight="1rem"
                  fontSize="0.75rem"
                >
                  {d["competition"]}
                </Box>
              </Hide>
              <Hide below="md">
                <Box
                  width="10.5rem"
                  height="2.3125rem"
                  lineHeight="1rem"
                  fontSize="0.75rem"
                >
                  {d["overall_score"]}
                </Box>
              </Hide>
            </Flex>
            <Divider />
          </>
        ))}
      </Box>
    </Box>
  );
}
