import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";

const MessageItem: FC<{message: string}> = ({ message }): JSX.Element => {
  return (
    <>
      <View style={styles.message}>
        <Text style={{ fontWeight: "bold" }}>message:</Text>
        <Text>{message}</Text> 
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  message: {
    paddingTop: 10,
    padding:20,
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
    fontWeight: "bold",
    backgroundColor: "#add8e6",
  },
});

export default MessageItem;