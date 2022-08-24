import { Box, Hide, Show } from "@chakra-ui/react";
import { ReactNode } from "react";
import { TableHeader } from "../../models/Table";
import ResponsiveTableElement from "./ResponsiveTableElement";
import ResponsiveTableRow from "./ResponsiveTableRow";

type HeaderColumn = {
  [key: string | number | symbol]: ReactNode;
};

const HeaderColumnMapper: HeaderColumn = {
  [TableHeader.competition]: (
    <ResponsiveTableElement children={TableHeader.competition} header />
  ),
  [TableHeader.search_volume]: (
    <ResponsiveTableElement children={TableHeader.search_volume} header />
  ),
  [TableHeader.overall_score]: (
    <ResponsiveTableElement children={TableHeader.overall_score} header />
  ),
};
interface Props {
  selectedColumn: string;
}
export default function ResponsiveTableHeader({
  selectedColumn,
}: Props): JSX.Element {
  return (
    <Box height="2.3125rem" boxSize="full" boxShadow="md">
      <ResponsiveTableRow>
        <ResponsiveTableElement children={TableHeader.keyword} primary header />
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
