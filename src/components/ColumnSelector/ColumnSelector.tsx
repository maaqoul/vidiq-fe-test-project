import { Show } from "@chakra-ui/react";

export default function ColumnSelector({ child }: any) {
  return <Show below="sm">{child}</Show>;
}
