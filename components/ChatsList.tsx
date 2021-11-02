import React, { FC, useEffect } from "react";
import { FlatList, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import {
  useQuery,
  gql
} from "@apollo/client";
import {coordinates} from '../types';

import { useNavigation } from '@react-navigation/native';
import { Center, Heading, HStack, Spinner } from "native-base";
import ChatListItem from './ChatListItem';

const ChatsList: FC<{location: coordinates | null}> = ({ location }) :JSX.Element => {
  const navigation = useNavigation();

  useEffect(() => {
  console.log('location ==> ', location);
  console.log('navigation ==> ', navigation);
  }, [])

  const locationInput = gql`
    input LocationInput{
      longitude: Float!
      latitude: Float!
    }
  `

  const getChatsQuery = gql`
    query MyQuery ($location: LocationInput!){
      getNearChats (location: $location){
        name
        id
        location {
          longitude
          latitude
        }
      }
  }`;

  //with useQuery this query is called upon render
  //network only flag skips the cached query result and makes another query request
  const { loading, error, data } = useQuery(getChatsQuery, {variables: {location: location}, fetchPolicy: "network-only" })

  useEffect(() => {
    // if(data) console.log(data.getAllChats);
    if(data) console.log(data.getNearChats);
  }, [data]);

  useEffect(() => {
    if(error) console.log('error =>' ,error);
  }, [error]);

  const onPressChatHandler = (id) => {
    navigation.push('Group Chat Screen', {id});
    console.log('id ==> ', id);
  };

  return (
    <>
    <Center>
      <Heading bold={true} fontSize="2xl">
        Available Chats
      </Heading>

      {loading &&
        <>
          <HStack space={2} alignItems="center">
            <Spinner size="lg" accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="2xl">
              Loading
            </Heading>
          </HStack>
        </>
      }

    </Center>
      
      
      {error && <Text>error...</Text>}
      {data && 
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data?.getNearChats}
          renderItem={(item) => 
            <ChatListItem chat={item.item}/>
          }
        />
      }

      {location && 
        <>
          <Text>lat: {location.latitude}</Text>
          <Text>long: {location.longitude}</Text>
        </>
      }
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
