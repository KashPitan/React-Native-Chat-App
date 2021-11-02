import React, { FC, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import {
  useMutation,
  gql
} from "@apollo/client";
import { Button, Heading, HStack, Input, Spinner, VStack, Text } from "native-base"


import { coordinates } from '../types'; 

const CreateChat: FC<{location: coordinates | null}> = ({ children, location }) => {
  const [createChatText, setCreateChatText] = useState<string>('');

  const locationInput = gql`
    input LocationInput{
      longitude: Float!
      latitude: Float!
    }
  `

  const CREATE_CHAT_QUERY = gql`
    mutation createChat ($name: String!, $location: LocationInput!) {
      createChat(name: $name, location: $location) {
        location {
          longitude
          latitude
          }
          name
      }
    }
  `;

  const [createChatMutation, { data, loading, error }] = useMutation(CREATE_CHAT_QUERY);

  useEffect(() => {
    console.log('location ==> ', location);
    console.log('loading ==> ', loading);
    }, [])
  
  

  useEffect(() => {
    if(error){
      alert('error');
    }
  }, [error]);

  useEffect(() => {
    if(data) alert('chat created');
    console.log('data ==> ', data);
  }, [data]);


  const createChatButtonHandler = async() => {
    //sends the api mutation request
    await createChatMutation({variables: { name:createChatText, location: location}});
    setCreateChatText('');
  }
  
  return (
    <VStack>
      {loading ? 
      <>
        <HStack space={2} alignItems="center">
          <Spinner size="lg" accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="2xl" alignSelf='center'>
            Creating Chat...
          </Heading>
        </HStack>
      </>
      :
      <>
        <Button m='3' colorScheme="teal" onPress={() => createChatButtonHandler()}>
          <Text fontSize='lg' color='white'>Create Chat</Text>
        </Button>
        <Input
          variant="rounded"
          p='3'
          m='2'
          size="lg"
          fontSize='lg'
          backgroundColor='white'
          placeholder="enter a chat name..."
          onChangeText={(text) => setCreateChatText(text)}
          value={createChatText}/>
      </>
      }
    </VStack>
  )
}

export default CreateChat;