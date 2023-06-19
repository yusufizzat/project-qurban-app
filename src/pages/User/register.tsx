import { ActivityIndicator, Alert, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OTPModal } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome'

const Register = () => {
    
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [noTelp, setNoTelp] = useState('');
    const [namaMasjid, setNamaMasjid] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false)

    const reg = () => {
      if(name == ''&&email == ''&&password == ''&&noTelp == '') {
        Alert.alert('Ups!','Anda belum memasukkan apapun',[
          {
            text: 'ok'
          }
        ])
      } else if (name == '') {
        Alert.alert('Ups!','Name wajib diisi',[
          {
            text: 'ok'
          }
        ])
      } else if(email == '') {
        Alert.alert('Ups!','Email wajib diisi',[
          {
            text: 'ok'
          }
        ])
      } else if(password == '') {
        Alert.alert('Ups!','Password wajib diisi',[
          {
            text: 'ok'
          }
        ])
      } else if (
          email.split('@')[1] !== 'gmail.com' &&
          email.split('@')[1] !== 'email.com'
      ) {
        Alert.alert('Ups!','Email yang anda masukkan tidak valid',[
          {
            text: 'ok'
          }
        ])
      } else if(password.length < 8) {
        Alert.alert('Ups!','Password minimal 8 karakter',[
          {
            text: 'ok'
          }
        ])
      } else if(noTelp == ''){

      }else {
    
  
          var formdata = new FormData();
          formdata.append('name', name);
          formdata.append('email', email);
          formdata.append('password', password);
          formdata.append('no_hp', noTelp);
          
          var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
          };
          
          fetch(
            'https://host.muhammadiyahexpo.com/api/register',
            requestOptions,
            )
            .then(response => response.json())
            .then(result => {console.log(result); 
              if(result.email == "The email has already been taken."){
                Alert.alert('Perhatian','email yang anda masukkan sudah terdaftar',[
                  {
                    text: 'Ok'
                  }
                ])
                console.log('big');
                
              } else {
                setModalVisible(true)
              }
            })
            .catch(error => console.log('error', error))
          
        };
      }

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1,backgroundColor:'white' }}
        enableOnAndroid
        extraHeight={Platform.select({ android: 130 })}
        keyboardShouldPersistTaps="handled"
      > 
      <View style={{flexDirection:'row',alignSelf:'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrow-left' size={20} color={'black'} style={{position:'absolute',left: -120}} />
        </TouchableOpacity>
        <Text style={styles.title}>Register</Text>
      </View>
    <View style={styles.conterInput}>
      <Text style={styles.name}>Nama</Text>
      <TextInput

        style={styles.input}
        onChangeText={(nm: string) => setName(nm)}
      />
    </View>
    <View style={styles.conterInput}>
      <Text style={styles.name}>Alamat Email</Text>
      <TextInput
      style={styles.input}

        onChangeText={(em: string) => setEmail(em)}
      />
    </View>
    <View style={styles.conterInput}>
      <Text style={styles.name}>No. Hp</Text>
      <TextInput

        style={styles.input}
        onChangeText={(np: string) => setNoTelp(np)}
        keyboardType="phone-pad"
      />
    </View>
    <View style={styles.conterInput}>
      <Text style={styles.name}>Password</Text>
      <TextInput

        style={styles.input}
        onChangeText={(pass: string) => setPassword(pass)}
      />
    </View>
    <View style={styles.conterInput}>
    </View>
    <TouchableOpacity style={styles.button}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.textButton} onPress={reg}>Register</Text>
      )}
    </TouchableOpacity>

  </KeyboardAwareScrollView>  
  <OTPModal visible={modalVisible}/>
  </View>
);
};

export default Register;

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor:'white',
  paddingTop:40
},
title: {
  fontSize: 25,
  color: 'black',
  fontFamily:'SemiBold',
},
conterInput: {
  paddingHorizontal: 20,
  marginTop: 20,
},
name: {
  fontSize: 14,
  color: 'black',
  fontFamily:'Regular'
},
input: {
  borderBottomWidth: 1,
  borderColor: colors.ijoprim,
  marginTop: 5,
  
},
button: {
  width: '80%',
  height: 45,
  backgroundColor: colors.ijoprim,
  alignSelf: 'center',
  marginTop: 55,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 60,
},
textButton: {
  fontSize: 20,
  color: 'white',
  fontFamily:'SemiBold'
},
})


//nama

//email

//nama masjid

//no hp

//password


//  onPress={() => reg()}