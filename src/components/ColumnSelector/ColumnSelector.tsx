import { Box, Select, Show } from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { TableHeader } from "../../models/Table";

interface Props {
  onChangeHandler: (event: SyntheticEvent) => void;
}

export default function ColumnSelector({ onChangeHandler }: Props) {
  const options = [
    TableHeader.search_volume,
    TableHeader.competition,
    TableHeader.overall_score,
  ];
  return (
    <Show below="sm">
      <Box mr="5" py="2">
        <Select borderRadius="6.25rem" onChange={onChangeHandler}>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </Select>
      </Box>
    </Show>
  );
}
