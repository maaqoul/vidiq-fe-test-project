import { Button, Flex } from "@chakra-ui/react";

interface Props {
  keywordsPerPage: number;
  totalKeywords: number;
  paginate: (page: number) => void;
  pageNumber: number;
}
const ResponsiveTablePagination = ({
  keywordsPerPage,
  totalKeywords,
  paginate,
  pageNumber,
}: Props): JSX.Element => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalKeywords / keywordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex flexDirection="row" width="full" justifyContent="center">
      {pageNumbers.map((number) => (
        <Button
          colorScheme="teal"
          mr="1"
          variant={pageNumber === number ? "solid" : "outline"}
          size="xs"
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </Button>
      ))}
    </Flex>
  );
};

export default ResponsiveTablePagination;
