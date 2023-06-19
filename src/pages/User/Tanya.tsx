import { Dimensions, Keyboard, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../utils/colors'
import { useNavigation } from '@react-navigation/native'
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MenuBars, Popup } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalKirim from '../../components/ModalKirim'

type RootDrawerParamList = {
  Home: undefined;
  TanyaAdmin: undefined;
  Info: undefined;

};

const Tanya = () => {
  const [popup,setPopup] = useState(false)
  type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList, 'Home'>;
  const Drawer = createDrawerNavigator();
  const Close = () => {
    Keyboard.dismiss()
  }
  const [nama,setNama] = useState('')
  const [email,setEmail] = useState('')
  const [noHp,setNoHp] = useState('')
  const [pesan,setPesan] = useState('')

  const Navigation = useNavigation<DrawerNavigationProps>();
      const handleMenuPress = () => {
        Navigation.toggleDrawer();
      };

  const kirim = () => {
    AsyncStorage.getItem('token').then(value => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${value}`);
      
      var formdata = new FormData();
      formdata.append("nama", nama);
      formdata.append("email", email);
      formdata.append("no_hp", noHp);
      formdata.append("pesan", pesan);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      
      fetch("https://host.muhammadiyahexpo.com/api/pesan", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setPopup(true)
        })
        .catch(error => console.log('error', error));
    })
  }
  return (
    <>
    <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent/>

    <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1,backgroundColor:'white' }}
        enableOnAndroid
        extraHeight={Platform.select({ android: 130 })}
        keyboardShouldPersistTaps="handled"
      > 
    <MenuBars styles1={styles.icon} onPress={handleMenuPress} color={'black'}/>
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Close}>
           <View style={[styles.BG,StyleSheet.absoluteFillObject]}/>
      </TouchableWithoutFeedback>

          <View style={styles.textContainer}>
            <Text style={styles.AdminText}>Tanya Admin</Text>
            <Text style={styles.AdminName}>Steven Fulan</Text> 
          </View>
           <View>
               <Text style={styles.titit}>Nama</Text>
               <TextInput  style={[styles.textInput,styles.title]} onChangeText={(nm: string) => setNama(nm)}/>
               <Text style={styles.titit}>Alamat Email</Text>
               <TextInput style={[styles.textInput,styles.title]} onChangeText={(em: string) => setEmail(em)}/>
               <Text style={styles.titit}>No. HP</Text>
               <TextInput style={[styles.textInput,styles.title]} onChangeText={(hp: string) => setNoHp(hp)}/>
               <Text style={styles.titit}>Pesan</Text>
               <TextInput multiline style={[styles.textInput,styles.title1]} onChangeText={(ps: string) => setPesan(ps)}/>
               <TouchableOpacity onPress={kirim}>
                <View style={{backgroundColor: colors.ijoprim,width:100,height:35,borderRadius: 10,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color: 'white',fontFamily:'SemiBold'}}>kirim</Text>
                </View>
               </TouchableOpacity>
           </View>
      </View>
      </KeyboardAwareScrollView>
      <ModalKirim visible={popup} onPress={() => setPopup(false)}/>
    </>
  )
}

export default Tanya
const width = Dimensions.get('window').width -50

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 35,
    backgroundColor:'white'
  },
  AdminText: {
    fontSize: 35,
    fontFamily:'Bold',
    color:'black'
  },
  AdminName: {
    fontSize: 20,
    fontFamily:'Regular',
    color: 'grey'
  },
  textInput: {
    width,
    borderWidth: 0.5,
    borderRadius: 10,

  },
  textContainer: {
    marginBottom: 20,
  },title: {
    height: 40,
    marginBottom:15,
    fontWeight: 'bold'
  },title1: {
    height: 90,
    marginBottom:15,
    fontWeight: 'bold',
    alignItems:'flex-start',
  },
  BG: {
    flex:1,
    zIndex: -1,
    backgroundColor:'white'
  },
  titit: {
    marginBottom: 10,
    fontFamily: 'Regular',
    color: 'black'
  },icon: {
        marginLeft: 20,
        marginTop: 25,
    },
    BG1: {
      flex:1,
      zIndex: 2,
      backgroundColor:'white'
    },
})