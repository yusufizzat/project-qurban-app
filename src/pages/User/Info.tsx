import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { MenuBars } from '../../components';

const width = Dimensions.get('window').width 

type RootDrawerParamList = {
  Home: undefined;
  TanyaAdmin: undefined;
  Info: undefined;

};

const Info = () => {
  type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList, 'Home'>;
  const Drawer = createDrawerNavigator();
  
  
    const Navigation = useNavigation<DrawerNavigationProps>();
    const handleMenuPress = () => {
      Navigation.toggleDrawer();
    };

  return (
    <>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'}/>
        <MenuBars styles1={styles.icon} onPress={handleMenuPress} color={'white'}/>
      <View style={styles.container}>
        <Image source={require('../../assets/images/bg.jpg')}  style={styles.bg}/>
      <View style={{width,height: 200,justifyContent:'center'}}>
        <Text style={styles.Title}>About</Text>
      </View>
      <View style={{backgroundColor:'white',flex: 1,paddingHorizontal: 20}}>
        <Text style={styles.Title2}>Credits</Text>
        <View style={styles.kotak}>
            <Text style={styles.nama}>Aldimas Dwi Mulyana</Text>
            <Text style={styles.role}>Back-End Developer</Text>
          </View>
          <View style={styles.kotak}>
            <Text style={styles.nama}>Yusuf Izzatur Rahman</Text>
            <Text style={styles.role}>Mobile developer</Text>
          </View>
          <View style={styles.kotak}>
            <Text style={styles.nama}>Sancha Putu Dirja</Text>
            <Text style={styles.role}>Front-End developer</Text>
          </View>
        <Text>
        </Text>
      </View>
      </View>
    </>
  )
}

export default Info

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },icon: {
    zIndex: 1,
    position:'absolute',
    top: 25,
    left: 20,
    
},Title: {
  alignSelf:'center',
  fontFamily:'SemiBold',
  color: '#FFFFFF',
  fontSize: 30,
},
bg: {
  width,
  height: 200,
  position:'absolute'
},
Title2:{
  margin: 25,
  alignSelf:'center',
  fontSize: 25,
  fontFamily: 'SemiBold',
  color: 'grey'

},kotak :{
  height: 100,
  backgroundColor:'white',
  elevation:3,
  justifyContent:'center',
  marginBottom: 25,
  paddingHorizontal: 20,
  borderRadius: 10
},nama: {
  fontSize: 20,
  fontFamily:'SemiBold',
  color: 'black'
},role: {
  fontSize: 15,
  fontFamily:'Regular',
  color: 'grey'
}
})