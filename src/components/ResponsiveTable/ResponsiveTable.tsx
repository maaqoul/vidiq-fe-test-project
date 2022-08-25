import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import ResponsiveTableBody from "./ResponsiveTableBody";
import ResponsiveTableHeader from "./ResponsiveTableHeader";
import ResponsiveTablePagination from "./ResponsiveTablePagination";

import { KEYWORDS_PER_PAGE } from "../../Constants";
import { Keyword } from "../../models/Keyword";
import { getKeywords, getTrendingKeywords } from "../../services/api";

interface Props {
  selectedColumn: string;
}

export default function ResponsiveTable({
  selectedColumn,
}: Props): JSX.Element {
  const [keywords, setKeywords] = useState<Keyword[]>(() => []);
  const [trendingKeywords, setTrendingKeywords] = useState<number[]>(() => []);

  //
  const [currentKeywords, setCurrentKeywords] = useState(2);

  // Get current posts
  const indexOfLastPost = currentKeywords * KEYWORDS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - KEYWORDS_PER_PAGE;
  const currentPosts = keywords.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: any) => setCurrentKeywords(pageNumber);

  useEffect(() => {
    const fetchTrendingKeywords = async () => {
      const result = await getTrendingKeywords();
      setTrendingKeywords(result);
    };
    fetchTrendingKeywords();
  }, []);

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
        keywords={currentPosts}
        selectedColumn={selectedColumn}
        trendingKeywords={trendingKeywords}
      />
      <ResponsiveTablePagination
        keywordsPerPage={KEYWORDS_PER_PAGE}
        totalKeywords={keywords.length}
        paginate={paginate}
        pageNumber={currentKeywords}
      />
    </Box>
  );
}
