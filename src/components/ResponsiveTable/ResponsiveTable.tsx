import { Box, Divider, Flex, Hide, Show } from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";
import { HEADER_HEIGHT } from "../../Constants";
import { Keyword } from "../../models/Keyword";

import { TableHeader } from "../../models/Table";
import { getKeywords, getTrendingKeywords } from "../../services/api";
import ResponsiveTableBody from "./ResponsiveTableBody";
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
  const [keywords, setKeywords] = useState<Keyword[]>(() => []);
  const [trendingKeywords, setTrendingKeywords] = useState<number[]>(() => []);

  useEffect(() => {
    const fetchTrendingKeywords = async () => {
      const result = await getTrendingKeywords();
      setTrendingKeywords(result);
    };
    fetchTrendingKeywords();
  });

  useEffect(() => {
    (async () => {
      const result = await getKeywords();
      setKeywords(result);
    })();
  }, []);

  return (
    <Box h="full" overflow="hidden">
      <ResponsiveTableHeader selectedColumn={selectedColumn} />
      <ResponsiveTableBody
        keywords={keywords}
        selectedColumn={selectedColumn}
        trendingKeywords={trendingKeywords}
      />
    </Box>
  );
}
