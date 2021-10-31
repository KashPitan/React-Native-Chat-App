import React, { FC, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Keyboard,
} from "react-native";
import MessageList from '../components/MessageList';
import {AWS_SOCKET_URL} from '@env';

const GroupChatScreen: FC = ({route, children}): JSX.Element => {

  const {id} = route.params;
  
  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const [connected, setConnected] = useState<boolean>(false);
  const [socket,setSocket] = useState<WebSocket>();

  useEffect(() => {
    console.log('route.params ==> ', route.params);
    if(AWS_SOCKET_URL){
      const socket = new WebSocket(`${AWS_SOCKET_URL}?chatId=${id}`);
      setSocket(socket);

      socket.addEventListener('open', e => {
        console.log('WebSocket is connected')
        setConnected(true);
      })

      socket.addEventListener('close', e => {
        console.log('WebSocket is closed');
        setConnected(false);
        alert('disconnected!');
      });

      socket.addEventListener("message", e => {
        if(typeof e.data){//check for internal server errors
          // console.log(JSON.parse(e));
          console.log('e ==> ', e);

          setMessages((prevState) => [...prevState, e.data]);
        }
      });

      socket.addEventListener('error', e => console.error('WebSocket is in error', e));

      //helps prevent duplicate websocket events by closing websocket when done
      return () => {
        socket.close();
      }

    }
  }, []);

  const sendMessage = () => {
    const message = { action: "message", data: {message: messageInput, chatId: id}};
    socket?.send(JSON.stringify(message));
    setMessageInput("");
    Keyboard.dismiss();
  };

  return (
    <View>
      
      <View style={styles.container}>
        <View style={styles.messagesContainer}>
          {messages && <MessageList messages={messages} />}
        </View>
      </View>

      <View style={{margin: 20}}>
        <Button title='Send' onPress={() => sendMessage()}/>
      </View>

      <TextInput
        style={styles.messageBox}
        placeholder="enter a message..."
        onChangeText={(text) => setMessageInput(text)}
        value={messageInput}
      ></TextInput>

    </View>
  )
}

export default GroupChatScreen;

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
  },
});

