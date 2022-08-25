import { Box, Hide, Show } from "@chakra-ui/react";
import { ReactNode } from "react";
import { TableHeader } from "../../models/Table";
import ResponsiveTableElement from "./ResponsiveTableElement";
import ResponsiveTableRow from "./ResponsiveTableRow";
import ResponsiveTableSorting from "./ResponsiveTableSorting";

type HeaderColumn = {
  [key: string | number | symbol]: ReactNode;
};

interface Props {
  selectedColumn: string;
  onSort: (sortParam: string, order: string) => void;
}
export default function ResponsiveTableHeader({
  selectedColumn,
  onSort,
}: Props): JSX.Element {
  const HeaderColumnMapper: HeaderColumn = {
    [TableHeader.competition]: (
      <ResponsiveTableElement header>
        <ResponsiveTableSorting
          onSort={onSort}
          sortParam={TableHeader.competition}
        />
      </ResponsiveTableElement>
    ),
    [TableHeader.search_volume]: (
      <ResponsiveTableElement header>
        <ResponsiveTableSorting
          onSort={onSort}
          sortParam={TableHeader.search_volume}
        />
      </ResponsiveTableElement>
    ),
    [TableHeader.overall_score]: (
      <ResponsiveTableElement header>
        <ResponsiveTableSorting
          onSort={onSort}
          sortParam={TableHeader.overall_score}
        />
      </ResponsiveTableElement>
    ),
  };
  return (
    <Box height="2.3125rem" boxSize="full" boxShadow="md">
      <ResponsiveTableRow>
        <ResponsiveTableElement primary header>
          <ResponsiveTableSorting
            onSort={onSort}
            sortParam={TableHeader.keyword}
          />
        </ResponsiveTableElement>
        <Show below="sm">{HeaderColumnMapper[selectedColumn]}</Show>
        <Hide below="sm">
          {HeaderColumnMapper[TableHeader.search_volume]}
          {HeaderColumnMapper[TableHeader.competition]}
          {HeaderColumnMapper[TableHeader.overall_score]}
        </Hide>
      </ResponsiveTableRow>
    </Box>
  );
}
