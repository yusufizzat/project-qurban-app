import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HomeAdmin, Order,OrderGroup } from '../pages/Admin'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();


const Bottom = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarShowLabel: false,

      tabBarStyle: {height: 60,position: 'relative'},

      tabBarIcon: ({focused, size, color}) => {
        let IconName: any;
        if (route.name === 'homeAdmin') {
          IconName= focused ? 'home' : 'home';
          color = focused ? colors.ijoprim : 'gray';
          size = focused ? size + 9 : size + 5;
        } else if (route.name === 'Order') {
          IconName = focused ? 'user' : 'user';
          color = focused ? colors.ijoprim : 'gray';
          size = focused ? size + 7 : size + 4;
        } else if (route.name === 'OrderGroup') {
          IconName = focused ? 'users' : 'users';
          color = focused ? colors.ijoprim : 'gray';
          size = focused ? size + 7 : size + 4;
        }

        return <Icon name={IconName} size={size} color={color} />;
      },
    })}>
          <Tab.Screen name="homeAdmin" component={HomeAdmin}/>
          <Tab.Screen name="Order" component={Order}/>
          <Tab.Screen name="OrderGroup" component={OrderGroup}/>
        </Tab.Navigator>
  )
}

export default Bottom

const styles = StyleSheet.create({})