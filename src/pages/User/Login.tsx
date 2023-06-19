import { Alert, Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '../../components'
import colors from '../../utils/colors'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();


  const [mata, setMata] = useState<boolean>(true)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text:string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text:string) => {
    setPassword(text);
  };

  const Log = () => {
    if(email == '') {
      Alert.alert('Ups!','email wajib diisi',[
        {
          text: 'ok'
        }
      ])
    } else if ( 
      email.split('@')[1] !== 'gmail.com' &&
      email.split('@')[1] !== 'email.com'
    ) {
      Alert.alert('Ups!','email yang anda masukkan salah',[
        {
          text: 'ok'
        }
      ])
    } else if(password== ''){
      Alert.alert('Ups!','password harus diisi',[
        {
          text: 'ok'
        }
      ])
    } else{
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    

fetch("https://host.muhammadiyahexpo.com/api/login", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    if(result.message == 'Login gagal'){
      Alert.alert('Perhatian','akun yang anda masukkan salah/belum terdaftar',[
        {
          text: 'Ok'
        }
      ])
    }else {
      if(result.message == "Welcome to home user")  {
        console.log(result.access_token);
        const id = result.id
        AsyncStorage.setItem('token',result.access_token);
        AsyncStorage.setItem('id', id.toString())
        
        AsyncStorage.setItem('role',result.message)
        console.log(id);
        navigation.replace('drawer')
      } else if(result.message == 'Welcome to home admin') {
          console.log(result.acces_token);
          const id = result.id
          AsyncStorage.setItem('token',result.access_token);
          AsyncStorage.setItem('role',result.message)
          navigation.replace('drawerAdmin')
          console.log(id);
          }
          
    }
  })
  .catch(error => console.log('error', error));
  }}
  
  return (
    <>
       <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent/>
        <View style={styles.container}>
              <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
             <Text style={styles.loginText}>Login</Text>
             <View style={{marginBottom: 35}}>
                <TextInput 
                  placeholder='Email'
                  placeholderTextColor="grey" 
                  style={styles.textInput1}
                  value={email}
                  onChangeText={handleEmailChange}
                />
                <View>
                <TextInput 
                  placeholder='Password'
                  placeholderTextColor="grey" 
                  style={styles.textInput2} 
                  secureTextEntry={mata} 
                  value={password}
                  onChangeText={handlePasswordChange}
                />
                <TouchableOpacity onPress={() => {setMata(!mata)}}>
                  {mata ? (
                    <Image source={require('../../assets/icons/view.png')} style={styles.mata}/>
                  ): (
                    <Image source={require('../../assets/icons/hide.png')} style={styles.mata}/>
                  )}
            </TouchableOpacity>
            <View style={styles.button}>
               <Button title={'Login Now'} onPress={Log} width={250} color={colors.ijoprim} textColor={'white'}/>
            </View>
            <Text style={{alignSelf: 'center',marginTop: 10}} onPress={() => navigation.navigate('register')}>Belum punya akun? daftar disini</Text>
                </View>
             </View>
        </View>
    </>
  )
}

export default Login
const width = Dimensions.get('window').width -50
const styles = StyleSheet.create({
  textInput1: {
    borderBottomWidth: 1,
    width,
    borderBottomColor:colors.ijosec,
    color:'black'
  },
  textInput2: {
    borderBottomWidth: 1,
    width,
    borderBottomColor:colors.ijosec,
    color:'black'
  },
  container: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor:'white'
  },
  loginText: {
    alignSelf: 'center',
    marginBottom: 80,
    fontSize: 35,
    fontFamily: 'SemiBold',
    color: 'black',
    marginTop: -70
    },
  mata: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: 12  ,
    right: 0
  },
  button: {
    alignSelf: 'center',
    marginTop: 90
  },
  logo: {
    marginBottom: 80,
    width:70,
    height:70,
    alignSelf:'center',
  }
})