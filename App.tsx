/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import { Views } from './views';
import { Components } from './components';

const Stack = createNativeStackNavigator();

const MainHeader = (props: NativeStackHeaderProps) => <Components.MainHeader {...props} />;
function App(): React.JSX.Element {
  const globalOptions: NativeStackNavigationOptions = {
    headerShown: false,
    orientation: 'portrait_up',
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Meteo" screenOptions={globalOptions}>
        <Stack.Screen name="Home" component={Views.HomeView}/>
        <Stack.Screen name="Registration" component={Views.RegisterView}/>
        <Stack.Screen name="Login" component={Views.LoginView}/>
        <Stack.Screen name="Dashboard" component={Views.DashboardView}/>
        <Stack.Screen name="Profile" component={Views.ProfileView}/>
        <Stack.Screen name="SubscriptionShow" component={Views.SubscriptionShowView}/>
        <Stack.Screen name="Meteo" component={Views.MeteoView}/>
        <Stack.Screen name="InvoiceList" component={Views.InvoiceListView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="InvoiceShow" component={Views.InvoiceShowView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="NotificationList" component={Views.NotificationListView}
        options={{headerShown: true, header: MainHeader}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
