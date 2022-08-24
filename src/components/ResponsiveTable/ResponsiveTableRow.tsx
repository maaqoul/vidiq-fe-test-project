import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function ResponsiveTableRow({ children }: Props): JSX.Element {
  return <Flex flexDirection="row">{children}</Flex>;
}
