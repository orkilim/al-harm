import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
});
  

export default function HomePage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome!</Text>
      <Text>I'm:</Text>
      <View style={styles.fixToText}>
            <Button
                title="Woman"
                background = "red"
                onPress={() =>
                navigation.navigate('WomanSignUp')}
            />
            <Button
                title="Guard"
                onPress={() =>
                navigation.navigate('GuardSignUp')}
            />
      </View>
    </View>
  );
}