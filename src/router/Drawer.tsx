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
import Bottom from './Bottom';
import colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootDrawerParamList = {
  Home: undefined;
  TanyaAdmin: undefined;
  Info: undefined;

};

type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList, 'Home'>;
const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
  const navigation1 =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation = useNavigation<DrawerNavigationProps>();
  const handleMenuPress = () => {
    navigation.toggleDrawer();
  };
  const Logout = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const requestOptions = {
        method: 'POST',
        headers: { Authorization: `bearer ${value}` },
        redirect: 'follow'
      };

      fetch("https://aldiku.muhammadiyahexpo.com/api/logoutuser", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          AsyncStorage.removeItem('token');
          navigation1.replace('login');
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  };
  // ini customisasi drawer nya
  return (
    <DrawerContentScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 ,marginLeft: 20}}>
          <Text style={{ marginLeft: 10, fontSize: 16, fontFamily: 'Bold',color:'black'}}>nama masjid</Text>
        </View>
        {/* Menu Items */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{ marginVertical: 25, marginLeft: 30,fontFamily:'SemiBold',color:'grey'}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TanyaAdmin')}>
          <Text style={{ marginVertical: 25, marginLeft: 30,fontFamily:'SemiBold',color:'grey'}}>Tanya Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Info')}>
          <Text style={{ marginVertical: 25, marginLeft: 30,fontFamily:'SemiBold',color:'grey' }}>About</Text>
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

function MyDrawer() {
  const CustomDrawerHeader = ({}) => {
    
    const navigation = useNavigation<DrawerNavigationProps>();

    const handleMenuPress = () => {
      navigation.toggleDrawer();
    };


  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={({
        headerShown: false,  
      })}
      drawerContent={() => <CustomDrawerContent/>}
      
    
    >
      <Drawer.Screen name="Home" component={Bottom} />
      <Drawer.Screen name="TanyaAdmin" component={Tanya} />
      <Drawer.Screen name="Info" component={Info} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;




const styles = StyleSheet.create({
  mata: {
    width: 30,
    height: 30,
    marginRight: 15
  },
})