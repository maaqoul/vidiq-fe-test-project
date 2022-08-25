import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import ResponsiveTableBody from "./ResponsiveTableBody";
import ResponsiveTableHeader from "./ResponsiveTableHeader";
import ResponsiveTablePagination from "./ResponsiveTablePagination";

import { KEYWORDS_PER_PAGE } from "../../Constants";
import { Keyword } from "../../models/Keyword";
import { getKeywords, getTrendingKeywords } from "../../services/api";
import useLocalStorage from "../../hooks/useLocalStorage";

interface Props {
  selectedColumn: string;
}

export default function ResponsiveTable({
  selectedColumn,
}: Props): JSX.Element {
  const [persistedOptions, setPersistedOptions] = useLocalStorage("options", {
    currentPage: 1,
    sortParam: "keyword",
    order: "asc",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>(() => []);
  const [totalCount, setTotalCount] = useState<number>(() => 0);
  const [trendingKeywords, setTrendingKeywords] = useState<number[]>(() => []);
  const [currentPage, setCurrentPage] = useState(
    () => persistedOptions.currentPage
  );
  const [order, setOrder] = useState(() => persistedOptions.order);
  const [sortParam, setSortParam] = useState(() => persistedOptions.sortParam);

  const tableHasScrollbarOnWindows =
    window.navigator.userAgent.indexOf("Win") !== -1 &&
    keywords.length >= KEYWORDS_PER_PAGE;

  useEffect(() => {
    const fetchTrendingKeywords = async () => {
      const result = await getTrendingKeywords();
      setTrendingKeywords(result.data);
    };
    fetchTrendingKeywords();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await getKeywords({
          page: currentPage,
          sort: sortParam,
          order,
        });
        setKeywords(result.data);
        setTotalCount(Number(result.total_count));
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    })();
  }, [currentPage, sortParam, order]);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setPersistedOptions({ ...persistedOptions, currentPage: pageNumber });
  };

  // sort
  const onSort = (sortParam: string, order: string) => {
    setSortParam(sortParam);
    setOrder(order);
    setPersistedOptions({ ...persistedOptions, order, sortParam });
  };

  return (
    <Box h="full" overflow="hidden" role="table">
      <ResponsiveTableHeader
        onSort={onSort}
        selectedColumn={selectedColumn}
        hasRightPadding={tableHasScrollbarOnWindows}
      />
      {loading && (
        <Flex
          height="80vh"
          width="full"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner color="teal" size="xl" />
        </Flex>
      )}

      {error ? (
        <Flex
          color="red"
          height="80vh"
          width="full"
          alignItems="center"
          justifyContent="center"
        >
          Something Went Wrong, if only had more time I would have figure it out
          :p
        </Flex>
      ) : (
        <>
          <ResponsiveTableBody
            keywords={keywords}
            selectedColumn={selectedColumn}
            trendingKeywords={trendingKeywords}
          />
          <ResponsiveTablePagination
            keywordsPerPage={KEYWORDS_PER_PAGE}
            totalKeywords={totalCount}
            onPaginate={paginate}
            pageNumber={currentPage}
          />
        </>
      )}
    </Box>
  );
}
