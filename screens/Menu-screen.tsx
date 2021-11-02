import React from 'react'
import { Text, View } from 'react-native';
import { Button, Center, VStack } from "native-base"

const Menu = ({navigation}) => {
  React.useEffect(() => {
  //  console.log( navigation);
  //  console.log('typeof navigation ==> ', typeof navigation);
  }, [])
  return (
    <Center flex={1} px="3">
      <VStack space={4} alignItems="center">

        <Button
          colorScheme="teal"
          onPress={() => navigation.push('Chat Screen')}
        >Go to individual chat Screen</Button>

        <Button
          colorScheme="teal"
          onPress={() => navigation.push('Chats Screen')}
        >Go to Chats Screen</Button>

        <Button
          colorScheme="teal"
          onPress={() => navigation.push('Test Screen')}
        >Go to Test Screen</Button>
    </VStack>
    </Center>
    
  )
}
export default Menu;

