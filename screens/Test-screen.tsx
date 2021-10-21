// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {AWS_SOCKET_URL} from '@env';

// const SOCKET_URL = process.env.AWS_WEBSOCKET_URL;
// navigation
const TestScreen = ({navigation}) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [socket,setSocket] = useState<WebSocket>();
  // const [socketId, setSocketId] = useState<string>('');

 console.log('testing2');
  useEffect(() => {
    // console.log('AWS_SOCKET_URL ==> ', AWS_SOCKET_URL);
    if(AWS_SOCKET_URL){
      const socket = new WebSocket(AWS_SOCKET_URL)
      setSocket(socket);

      socket.addEventListener('open', e => {
        console.log('WebSocket is connected')
        // setSocketId(socket.);
        setConnected(true);
      })
      
      socket.addEventListener('close', e => {
        console.log('WebSocket is closed');
        setConnected(false);
        alert('disconnected!');
      });

      socket.addEventListener('message', e => {
        // console.log(e);
      });

    
      socket.addEventListener('error', e => console.error('WebSocket is in error', e))
    }
    
    
  }, []);

  const disconnectButtonHandler = () => {

    if(socket) socket.close();
    const text = 'hello world';
    const message = { action: "message", text };
    socket?.send(JSON.stringify(message));
  }

  const sendMessageHandler = () => {
    const data = 'hello world';
    const message = { action: "message", data };
    socket?.send(JSON.stringify(message));
    socket?.send('fs');
    // console.log('hi ==> ');
  }

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20}}>{connected ? 'connected' : 'disconnected'}</Text>
        <TouchableOpacity style={[styles.saveButton,{marginBottom: 30}]} onPress={() => disconnectButtonHandler()}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Disconnect</Text>
        </TouchableOpacity>
      

      <TouchableOpacity style={styles.saveButton} onPress={() => sendMessageHandler()}>
        <Text style={{fontWeight: 'bold', color: 'white', }}>Send Message</Text>
      </TouchableOpacity>

      {/* <Button
        title="Go to Chats Screen"
        onPress={() => navigation.push('Chats Screen')}
      /> */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton : {
    borderRadius:20,
    width: '50%',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#20b2aa',
    elevation: 2, // Android
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
