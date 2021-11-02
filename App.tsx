
import * as React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { createAuthLink, AuthOptions,AUTH_TYPE } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import { ApolloLink } from "apollo-link";
import { createHttpLink, HttpLink } from "apollo-link-http";

// import {AWSAppSyncClient} from "aws-appsync";
import {GRAPHQL_API_URL, GRAPHQL_API_KEY} from '@env';
import appSyncConfig from "./aws-exports";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NativeBaseProvider, Box } from 'native-base';

import TestScreen from './screens/Test-screen';
import Menu from './screens/Menu-screen';
import ChatsScreen from './screens/Chats-screen';
import Chat from './screens/Chat';
import GroupChatScreen from './screens/GroupChat-screen';
import { useEffect } from 'react';

//env file changes not loading in??
// const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const url = GRAPHQL_API_URL;

const region = appSyncConfig.aws_appsync_region;
const auth : AuthOptions = {
  type: AUTH_TYPE.API_KEY,
  // apiKey: appSyncConfig.aws_appsync_apiKey,
  apiKey: GRAPHQL_API_KEY
  // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  // credentials: async () => credentials, // Required when you use IAM-based auth.
};

const Stack = createNativeStackNavigator();

const httpLink = createHttpLink({ uri: url });
// const httpLink = new HttpLink({ uri: url });

//cast as any fromn ApolloLink to fix issue with link?
const link: any = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default function App() {

  //env file changes not loading in??
  // useEffect(() => {
  //   console.log('{ url, region, auth } ==> ', { url, region, auth });
  // }, [])
  
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Menu Screen">
            <Stack.Screen name="Test Screen" component={TestScreen} options={{ title: 'Home' }}/>
            <Stack.Screen name="Menu Screen" component={Menu} options={{ title: 'Menu' }}/>
            <Stack.Screen name="Chats Screen" component={ChatsScreen} />
            <Stack.Screen name="Chat Screen" component={Chat} options={{ title: 'Chat' }}/>
            <Stack.Screen name="Group Chat Screen" component={GroupChatScreen} options={{ title: 'Group Chat' }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
