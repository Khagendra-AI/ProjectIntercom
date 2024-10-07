import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomTabs from './src/routes/bottomTab'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './src/screens/Search';
import Chat from './src/screens/Chat';
const Stack = createNativeStackNavigator();




const App = () => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{headerShown: false}}
          name="Bottom"
          component={BottomTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Search"
          component={Search}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
    {/* <Account /> */}
  </>

  )
}

export default App

const styles = StyleSheet.create({})