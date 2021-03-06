import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WomanSignUp from './Components/WomanSignUp'
import HomePage from './Components/HomePage'
import GuardSignUp from './Components/GuardSignUp'
import ContactsPage from './Components/Contacts'

const Stack = createStackNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Welcome" component={HomePage} />
              <Stack.Screen name="WomanSignUp" component={WomanSignUp} />
              <Stack.Screen name="GuardSignUp" component={GuardSignUp} />
              <Stack.Screen name="ContactsPage" component={ContactsPage} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

