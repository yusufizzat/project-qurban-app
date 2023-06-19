import { Home,History,HistoryGroup } from '../pages/User';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/colors';

const Tab = createBottomTabNavigator();


const Bottom = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarShowLabel: false,

      tabBarStyle: {height: 60,position: 'relative'},

      tabBarIcon: ({focused, size, color}) => {
        let iconName: any;
        if (route.name === 'home') {
          iconName = focused ? 'home' : 'home';
          color = focused ? colors.ijoprim : 'gray';
          size = focused ? size + 9 : size + 5;
        } else if (route.name === 'history') {
          iconName = focused ? 'user' : 'user';
          color = focused ? colors.ijoprim : 'gray';
          size = focused ? size + 9 : size + 5;
        } else if (route.name === 'historyGroup') {
          iconName = focused ? 'users' : 'users';
          color = focused ? colors.ijoprim : 'gray';
          size = focused ? size + 9 : size + 5;
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}>
          <Tab.Screen name="home" component={Home}/>
          <Tab.Screen name="history" component={History}/>
          <Tab.Screen name="historyGroup" component={HistoryGroup}/>
        </Tab.Navigator>
  )
}

export default Bottom

const styles = StyleSheet.create({})