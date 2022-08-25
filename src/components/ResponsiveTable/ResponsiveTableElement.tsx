import { Box } from "@chakra-ui/react";

interface Props {
  primary?: boolean;
  header?: boolean;
  children: string | number | JSX.Element;
}
export default function ResponsiveTableElement({
  primary,
  header,
  children,
}: Props): JSX.Element {
  return (
    <Box
      fontSize="0.75rem"
      lineHeight="1rem"
      color={header ? "#7A7A7A" : "#252626"}
      flex={primary ? "3" : "1"}
      p="2"
    >
      {children}
    </Box>
  );
}
