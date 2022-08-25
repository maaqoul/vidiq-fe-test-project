import { Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { TableHeader } from "../../models/Table";

interface Props {
  sortParam: TableHeader;
  onSort: (sortParam: string, order: string) => void;
}

const sortParamMapper: { [key: string]: string } = {
  [TableHeader.competition]: "competition",
  [TableHeader.keyword]: "keyword",
  [TableHeader.overall_score]: "overall_score",
  [TableHeader.search_volume]: "search_volume",
};

export default function ResponsiveTableSorting({
  sortParam,
  onSort,
}: Props): JSX.Element {
  return (
    <Flex flexDirection="row" alignItems="center">
      <Text>{sortParam}</Text>
      <Stack direction="column" spacing="1px">
        <IconButton
          aria-label="Sort Ascending"
          icon={<ChevronUpIcon />}
          backgroundColor="#fff"
          p="0"
          height="0.4rem"
          width="1rem"
          minW="0.2rem"
          m="0"
          onClick={() => onSort(sortParamMapper[sortParam], "asc")}
        />
        <IconButton
          aria-label="Sort Descending"
          icon={<ChevronDownIcon />}
          backgroundColor="#fff"
          p="0"
          height="0.4rem"
          minW="0.2rem"
          width="1rem"
          onClick={() => onSort(sortParamMapper[sortParam], "desc")}
        />
      </Stack>
    </Flex>
  );
}
