import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Splash,Login,Hello,Home,Register } from './pages/User'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyDrawer from './router/Drawer';
import { HomeAdmin, Order,OrderGroup,Pesan } from './pages/Admin';
import MyDrawer1 from './router2/DrawerAdmin';

import Bottom from './router2/Bottom2'



export type RootStackParams = {
  splash: undefined;
  hello: undefined;
  login:undefined;
  drawer: undefined;
  MyDrawer: undefined;
  TanyaAdmin: undefined;
  Info: undefined;
  register: undefined
  form: undefined
  order: undefined;
  ordergroup: undefined
  pesan: undefined
  drawerAdmin: undefined
}


const Stack = createNativeStackNavigator();
const App = () => { 
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="splash" component={Splash} options={{headerShown: false}}/> 
        <Stack.Screen name="hello" component={Hello} options={{headerShown: false}}/> 
        <Stack.Screen name="login" component={Login} options={{headerShown: false}}/> 
        <Stack.Screen name="register" component={Register} options={{headerShown: false}}/> 
        <Stack.Screen name="drawer" component={MyDrawer} options={{headerShown: false}}/>
      <Stack.Screen name="order" component={Order} options={{ headerShown: false }} />
      <Stack.Screen name="ordergroup" component={OrderGroup} options={{ headerShown: false }} /> 
      <Stack.Screen name="drawerAdmin" component={MyDrawer1} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  

  )
}

export default App

const styles = StyleSheet.create({})