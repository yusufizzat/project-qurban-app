import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { Button } from '../../components';


const Hello = () => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent/>
            <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
            </View>
            <View style={styles.container}>
                <Image source={require('../../assets/images/kambing.png')} style={styles.kmbng}/>
                <Text style={{fontSize: 30,fontFamily: 'Bold',color: 'black'}}>Halo !</Text>
                <Text style={{fontSize: 17,fontFamily: 'Regular',color: 'black'}}>Selamat datang di Qurban app</Text>
            </View>
            <View style={styles.container2}>
                <View style={{marginTop:50,flexDirection: 'row'}}>
                     <Button title={'Log in'} onPress={() => navigation.replace('login')}  width={170} color={colors.ijoprim} textColor={'white'}/>
                     <Button title={'Sign Up'} onPress={() => navigation.navigate('register')}  width={170} color={'white'} borderWidth={2} textColor={colors.ijoprim}/>
                </View>
            </View>
    </>
  )
}

export default Hello
const width = Dimensions.get('window').width 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        padding: 20,
        
    },container2: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },kmbng: {
        width: 250,
        height: 250,
        alignSelf:'center',
        marginVertical:70
    },
    emptyHeaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
        backgroundColor:'white'
      },
})