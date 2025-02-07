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
const ShopHeader = (props: NativeStackHeaderProps) => <Components.ShopHeader {...props} />;

function App(): React.JSX.Element {
  const globalOptions: NativeStackNavigationOptions = {
    headerShown: false,
    orientation: 'portrait_up',
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={globalOptions}>
        <Stack.Screen name="Home" component={Views.HomeView}/>
        <Stack.Screen name="Registration" component={Views.RegisterView}/>
        <Stack.Screen name="Login" component={Views.LoginView}/>
        <Stack.Screen name="Dashboard" component={Views.DashboardView}/>
        <Stack.Screen name="Profile" component={Views.ProfileView}/>
        <Stack.Screen name="SubscriptionShow" component={Views.SubscriptionShowView}/>
        <Stack.Screen name="Meteo" component={Views.MeteoView}/>
        <Stack.Screen name="ReferralList" component={Views.ReferralListView}/>
        <Stack.Screen name="Assurance" component={Views.AssuranceView}/>
        <Stack.Screen name="InvoiceList" component={Views.InvoiceListView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="InvoiceShow" component={Views.InvoiceShowView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="NotificationList" component={Views.NotificationListView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="CourseList" component={Views.CourseListView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="CourseShow" component={Views.CourseShowView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="Monitoring" component={Views.MonitoringView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="Faq" component={Views.FaqListView}
        options={{headerShown: true, header: MainHeader}}/>
        <Stack.Screen name="ProductList" component={Views.ProductListView}
        options={{headerShown: true, header: ShopHeader}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
