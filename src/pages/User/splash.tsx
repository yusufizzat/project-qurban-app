import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import colors from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';


const Splash = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();
  setTimeout(() => {
    AsyncStorage.multiGet(['token','role']).then(value => {
      const token = value[0][1]
      const role = value[1][1]
        console.log(value);
        
        if(token!== null){
            if(role === 'welcome to home admin'){
              navigation.replace('drawerAdmin')
            }else{

              navigation.replace('drawer')
            }
        } else {
            navigation.replace('hello')
        }
    })
}, 3000);
  return (
    <>
     <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent/>
      <View style={styles.container}>
      <LottieView
        source={require('../../components/splash.json')}
        autoPlay
        loop
      />
      </View>
    </>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        fontSize: 45,
        fontFamily: 'SemiBold',
        color: colors.ijoprim
    }
})

// AsyncStorage.getItem('token').then(value => {
//   console.log(value);
  
//   if(value !== null){
//       navigation.replace('drawer')
//   } else {
//       navigation.replace('hello')
//   }
// })