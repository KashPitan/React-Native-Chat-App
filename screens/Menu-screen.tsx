import React from 'react'
import { Button, Text, View } from 'react-native';

const Menu = ({navigation}) => {
  return (
    <View>
      <Text>Menu?</Text>
       <View style={{marginBottom: 20,marginTop: 20}}>
        <Button
          title="Go to individual chat Screen"
          onPress={() => navigation.push('Chat Screen')}
        />
      </View>

      <View style={{marginBottom: 20,marginTop: 20}}>
        <Button
          title="Go to Chats Screen"
          onPress={() => navigation.push('Chats Screen')}
        />
      </View>

      <View style={{marginBottom: 20,marginTop: 20}}>
        <Button
          title="Go to Test Screen"
          onPress={() => navigation.push('Test Screen')}
        />
      </View>
    </View>
  )
}
export default Menu;

