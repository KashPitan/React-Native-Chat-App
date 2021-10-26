import React, { FC, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

import {
  useQuery,
  gql
} from "@apollo/client";

const ChatsList: FC<{}> = ({ children }) :JSX.Element => {

  const getChatsQuery = gql`
    query MyQuery {
      getChats {
        name
      }
  }`;

  //with useQuery this query is called upon render
  const { loading, error, data } = useQuery(getChatsQuery)

  useEffect(() => {
    if(data) console.log( data.getChats);

  }, [data])

  return (
    <>
    <Text>Available Chats</Text>
    {loading && <Text>loading...</Text>}
    {error && <Text>error...</Text>}
    {data && <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={data?.getChats}
      renderItem={(item) => <Text style={styles.message}>{item.item.name}</Text>}
    />}
    {/* {data && <Text>there is data</Text>} */}
    </>
    
  );
};

export default ChatsList;

const styles = StyleSheet.create({
  message: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
    fontWeight: "bold",
    backgroundColor: "#add8e6",
  },
});
