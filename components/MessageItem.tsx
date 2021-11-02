import { Box, Text } from "native-base";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

const MessageItem: FC<{message: string}> = ({ message }): JSX.Element => {
  return (
    <>
      <Box
        bg="cyan.700"
        p="2"
        m="1"
        rounded="10">
        <Text color="cyan.50" mr="3" fontWeight="medium" fontSize={15}>
          {message}
        </Text>
      </Box>
    </>
  );
};

export default MessageItem;