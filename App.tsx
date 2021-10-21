
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TestScreen from './screens/Test-screen';
import Menu from './screens/Menu-screen';
import ChatsScreen from './screens/Chats-screen';
import Chat from './screens/Chat';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu Screen">
      <Stack.Screen name="Test Screen" component={TestScreen} options={{ title: 'Home' }}/>
        <Stack.Screen name="Menu Screen" component={Menu} options={{ title: 'This is the title' }}/>
        <Stack.Screen name="Chats Screen" component={ChatsScreen} />
        <Stack.Screen name="Chat Screen" component={Chat} options={{ title: 'Chat' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
