import { Box, Pressable, Text } from "native-base";
import React, { FC } from "react";

import { useNavigation } from '@react-navigation/native';


const ChatListItem: FC<{chat: {name: string, id: string}}> = ({ chat }): JSX.Element => {
  const navigation = useNavigation();

  const onPressChatHandler = (id) => {
    navigation.push('Group Chat Screen', {id});
  };

  return (
    <>
      <Pressable onPress={() => onPressChatHandler(chat.id)}>
        {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            bg={isPressed ? "cyan.900" : isHovered ? "cyan.800" : "cyan.700"}
            p="3"
            m="1"
            rounded="10"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
          >
            <Text color="cyan.50" fontWeight="medium" fontSize={15}>
            {chat.name}
            </Text>
          </Box>
        )
          }}
      </Pressable>
    </>
  );
};

export default ChatListItem;