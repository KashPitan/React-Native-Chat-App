import React, { FC } from "react";
import { FlatList } from "react-native";
import MessageItem from "./MessageItem";

const MessageList: FC<{messages: string[]}> = ({ children, messages }) :JSX.Element => {
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={messages}
      renderItem={(item) => <MessageItem message={item.item} />}
    />
  );
};

export default MessageList;