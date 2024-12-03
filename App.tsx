/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Views } from './views';
import { Components } from './components';

const Stack = createNativeStackNavigator();

const MainHeader = (props: NativeStackHeaderProps) => <Components.MainHeader {...props} />;
function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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
        <Stack.Screen name="InvoiceList" component={Views.InvoiceListView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="InvoiceShow" component={Views.InvoiceShowView}
        options={{headerShown: true, header: MainHeader}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
