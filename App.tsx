/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Views } from './views';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Home" component={Views.HomeView}
        options={{headerShown: false}}/>
        <Stack.Screen name="Registration" component={Views.RegisterView}
        options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Views.LoginView}
        options={{headerShown: false}}/>
        <Stack.Screen name="Dashboard" component={Views.DashboardView}
        options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Views.ProfileView}
        options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
