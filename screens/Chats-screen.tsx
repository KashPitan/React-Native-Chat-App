import React from 'react'
import { Button, Text, View } from 'react-native';

const ChatsScreen = ({navigation}) => {
  return (
    <View>
      <Text>Chats Screen</Text>

      <View style={{marginBottom: 20,marginTop: 20}}>
        <Button title='Create Chat' onPress={() => console.log('pressed')}/>
      </View>
      <View style={{marginBottom: 20,marginTop: 20}}>
        <Button
          title="Go to AnotherScreen"
          onPress={() => navigation.push('Another Screen')}
        />
      </View>

    </View>
  )
}

export default ChatsScreen;
