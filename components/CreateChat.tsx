import React, { FC, useEffect, useState } from 'react'
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import {
  useMutation,
  gql
} from "@apollo/client";

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

// latitude: Float!, longitude: Float!

  const [createChatMutation, { data, loading, error }] = useMutation(CREATE_CHAT_QUERY);

  useEffect(() => {
    console.log('location ==> ', location);
    // console.log('getChatsQuery ==> ', CREATE_CHAT_QUERY.definitions);
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
    <View>

      <View style={{margin: 20}}>
        <Button title='Create Chat' onPress={() => createChatButtonHandler()}/>
      </View>

      {/* {location && 
        <>
          <Text>lat: {location.latitude}</Text>
          <Text>long: {location.longitude}</Text>
        </>
      } */}
      

      <TextInput
        style={styles.messageBox}
        placeholder="enter a message..."
        onChangeText={(text) => setCreateChatText(text)}
        value={createChatText}
        />

    </View>
  )
}

export default CreateChat;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    margin: 10,
    padding: 10,
    height: '70%',
    width: '90%',
    borderRadius: 5,
    backgroundColor: "#fff",
    alignSelf:'center',
  },
  messagesContainer: {
    flex: 1,
    alignItems:"flex-start",
    justifyContent: "center",
  },
  messageBox: {
    paddingTop: 10,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    backgroundColor: "#fff",
    textAlign:'center',
    // paddingLeft:20
  },
});