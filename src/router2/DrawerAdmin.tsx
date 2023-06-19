import { createDrawerNavigator, DrawerContentScrollView, DrawerNavigationProp } from '@react-navigation/drawer';
import { Tanya, Info, Home } from '../pages/User';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, View,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { useEffect, useState } from 'react';
import { RotateInUpLeft } from 'react-native-reanimated';
import Bottom from '../router/Bottom';
import colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeAdmin, Pesan } from '../pages/Admin';
import Bottom2 from './Bottom2';

type RootDrawerParamList = {
  homeAdmin1: undefined;
  pesan: undefined

};


type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList, 'homeAdmin1'>;
const Drawer = createDrawerNavigator();

function CustomDrawerContent() {

  const navigation1 =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation = useNavigation<DrawerNavigationProps>();
  const handleMenuPress = () => {
    navigation.toggleDrawer();
  };
  const Logout = () => {
    AsyncStorage.getItem('token').then(value => {
  
      var requestOptions = {
        method: 'POST',
        headers: {Authorization: `bearer ${value}`},
        redirect: 'follow'
      };
  
      fetch("https://aldiku.muhammadiyahexpo.com/api/logout", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result),AsyncStorage.removeItem('token'),navigation1.replace('login')})
        .catch(error => console.log('error', error));
    })  
  }
  // ini customisasi drawer nya
  return (
    <DrawerContentScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 ,marginLeft: 20}}>
          <Text style={{ marginLeft: 10, fontSize: 16, fontFamily: 'Bold',color:'black'}}>Admin</Text>
        </View>
        {/* Menu Items */}
        <TouchableOpacity onPress={() => navigation.navigate('homeAdmin1')}>
          <Text style={{ marginVertical: 25, marginLeft: 30,fontFamily:'SemiBold',color:'grey'}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('pesan')}>
          <Text style={{ marginVertical: 25, marginLeft: 30,fontFamily:'SemiBold',color:'grey'}}>pesan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Logout}>
          <View style={{backgroundColor: colors.ijoprim,margin: 16,borderRadius: 10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{ marginVertical: 25,marginLeft: 16,fontFamily:'SemiBold',color:'white'}}>Log Out</Text>
            <Image source={require('../assets/icons/logout.png')} style={styles.mata}/> 
          </View>
        </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

function MyDrawer1() {
  const CustomDrawerHeader = ({}) => {
    
    const navigation = useNavigation<DrawerNavigationProps>();

    const handleMenuPress = () => {
      navigation.toggleDrawer();
    };


  };

  return (
    <Drawer.Navigator
      initialRouteName="homeAdmin1"
      screenOptions={({
        headerShown: false,  
      })}
      drawerContent={() => <CustomDrawerContent/>}
      
    
    >
      <Drawer.Screen name="homeAdmin1" component={Bottom2} />
      <Drawer.Screen name="pesan" component={Pesan} />
    </Drawer.Navigator>
  );
}

export default MyDrawer1;




const styles = StyleSheet.create({
  mata: {
    width: 30,
    height: 30,
    marginRight: 15
  },
})