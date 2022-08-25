import { Button, Flex } from "@chakra-ui/react";

interface Props {
  keywordsPerPage: number;
  totalKeywords: number;
  onPaginate: (page: number) => void;
  pageNumber: number;
}

const ResponsiveTablePagination = ({
  keywordsPerPage,
  totalKeywords,
  onPaginate,
  pageNumber,
}: Props): JSX.Element => {
  const pageNumbers = [
    ...Array(Math.ceil(totalKeywords / keywordsPerPage)),
  ].map<number>((_, index) => index + 1);

  return (
    <Flex flexDirection="row" width="full" justifyContent="center">
      {pageNumbers.map((number) => (
        <Button
          colorScheme="teal"
          mr="1"
          variant={pageNumber === number ? "solid" : "outline"}
          size="xs"
          key={number}
          onClick={() => onPaginate(number)}
        >
          {number}
        </Button>
      ))}
    </Flex>
  );
};

export default ResponsiveTablePagination;
