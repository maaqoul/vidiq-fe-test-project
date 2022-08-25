import {
  Box,
  Divider,
  Flex,
  Hide,
  Show,
  useMediaQuery,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { DESKTOP_SPACE_HEIGHT, MOBILE_SPACE_HEIGHT } from "../../Constants";
import { Keyword } from "../../models/Keyword";
import { TableHeader } from "../../models/Table";
import ElementScore from "./ElementScore";
import ResponsiveTableElement from "./ResponsiveTableElement";
import ResponsiveTableRow from "./ResponsiveTableRow";
import TrendingKeyWordElement from "./TrendingKeywordElement";

interface Props {
  trendingKeywords: any;
  selectedColumn: string;
  keywords: Keyword[];
}

type StringOrNumber = string | number;

type BodyColumn = {
  [key: StringOrNumber | symbol]: (k: Keyword) => ReactNode;
};

const BodyColumnMapper: BodyColumn = {
  [TableHeader.competition]: (keyword: Keyword) => (
    <ResponsiveTableElement children={keyword.competition} />
  ),
  [TableHeader.search_volume]: (keyword: Keyword) => (
    <ResponsiveTableElement children={keyword.search_volume} />
  ),
  [TableHeader.overall_score]: (keyword: Keyword) => (
    <ResponsiveTableElement>
      <ElementScore score={keyword.overall_score} />
    </ResponsiveTableElement>
  ),
};

export default function ResponsiveTableBody({
  trendingKeywords,
  selectedColumn,
  keywords,
}: Props): JSX.Element {
  const [isDesktop] = useMediaQuery("(min-width: 47em)");

  return (
    <Box
      w="full"
      overflowY="auto"
      h={`calc(100vh - ${
        isDesktop ? DESKTOP_SPACE_HEIGHT : MOBILE_SPACE_HEIGHT
      }px)`}
      scrollBehavior="smooth"
    >
      {keywords.map((keyword) => (
        <Box key={keyword.id}>
          <ResponsiveTableRow>
            <TrendingKeyWordElement
              content={keyword.keyword}
              id={keyword.id}
              trendingKeywords={trendingKeywords}
            />
            <Show below="sm">{BodyColumnMapper[selectedColumn](keyword)}</Show>
            <Hide below="sm">
              {BodyColumnMapper[TableHeader.search_volume](keyword)}
              {BodyColumnMapper[TableHeader.competition](keyword)}
              {BodyColumnMapper[TableHeader.overall_score](keyword)}
            </Hide>
          </ResponsiveTableRow>
          <Divider />
        </Box>
      ))}
    </Box>
  );
}
