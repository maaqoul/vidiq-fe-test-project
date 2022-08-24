import { Box, Center, Flex } from "@chakra-ui/react";

interface Props {
  score: number;
}

export default function ElementScore({ score }: Props) {
  const getScoreColor = () => {
    if (score <= 10) {
      return "#FF0000";
    } else if (score <= 40) {
      return "#FF9B3F";
    } else if (score <= 70) {
      return "#FFC71C";
    } else {
      return "#8FE04E";
    }
  };

  return (
    <Flex
      backgroundColor={getScoreColor()}
      width="2.188rem"
      height="1.438rem"
      borderRadius="2rem"
      color="#FFF"
      justifyContent="center"
      alignItems="center"
    >
      <Center>{score}</Center>
    </Flex>
  );
}
