import { Dimensions, Image, StyleSheet, Text, View,Modal, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import colors from '../utils/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CheckButton } from '.'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Props {
  visible: boolean;
  onPress?: () => void;
  onPress2?: () => void;
  selectedId: number | null;
  price: number; // Menambahkan prop 'price
  namaP: string
}

const FormIndividu: React.FC<Props> = ({visible,onPress,onPress2,selectedId,price,namaP}) => {
  const [nama,setNama] = useState('')
  const [namaMasjid,setNamaMasjid] = useState('')
  

  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();

  

  const handleTextChange = (text: any, valueFor: string) => {
    if(valueFor == 'nama') setNama(text)
    if(valueFor == 'namaMasjid') setNamaMasjid(text)
  }
  const pesan = () => {
    console.log(selectedId);
    console.log(price);
    
    
        AsyncStorage.multiGet(['token','id']).then(values => {
          const token = values[0][1];
          const id = values[1][1];
          var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            var formdata = new FormData();
            formdata.append("id_user", id);
            formdata.append("id_kurban", selectedId);
            formdata.append("nama_masjid", namaMasjid);
            formdata.append("nama", nama);
            formdata.append("harga", price);

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
            };
            
            fetch("https://host.muhammadiyahexpo.com/api/order", requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if (onPress2) {
                  onPress2();
                }
                
              })
              .catch(error => console.log('error', error));
                    })
                  }
          
  return (
    <Modal visible={visible} animationType='fade'>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1,backgroundColor:'white' }}
        enableOnAndroid
        extraHeight={Platform.select({ android: 130 })}
        keyboardShouldPersistTaps="handled"
      > 
      
        <View style={styles.container}>     
          <Text style={styles.Title}>Form Order Individu</Text>
          <Text style={{fontSize: 25,fontFamily:'Regular',color: 'grey'}}>{namaP.replace(/_/g, ' ')}</Text>
         {namaP.includes('sapi') || namaP.includes('Sapi') ? 
          <Image source={require('../assets/images/sapitipe.png')} style={styles.Image}/> :
          <Image source={require('../assets/images/kambingtipe.png')} style={styles.Image}/>
        }
          <Text style={{fontSize: 17,fontFamily:'Regular',color: 'grey'}}>harga : Rp{price}.000.000,00</Text>
          <Text style={styles.Text}>Nama</Text>
          <TextInput 
            style={styles.textInput1}
            value={nama}
            onChangeText={text => handleTextChange(text,'nama')}
          />
          <Text style={styles.Text}>Nama Masjid</Text>
          <TextInput 
            style={styles.textInput1}
            value={namaMasjid}
            onChangeText={text => handleTextChange(text,'namaMasjid')}
          />
          <View style={styles.BtnContainer}>
          <CheckButton Icon2={'close-outline'} styles2={{marginRight: 20}} onPress={onPress}/>
          {nama.trim() && namaMasjid.trim() ?
    
           <CheckButton Icon2={'checkmark-outline'} onPress={pesan}/>
           
           : null
          }
        </View>
        </View>
        
    </KeyboardAwareScrollView>
    </Modal>
  )
}

export default FormIndividu
const width = Dimensions.get('window').width -40
const styles = StyleSheet.create({
  textInput1: {
    borderBottomWidth: 1,
    width,
    borderBottomColor:colors.ijosec,
    color:'black',
    marginBottom: 20
  },
  container: {
    paddingHorizontal: 20,
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor:'white',
    paddingVertical: 20,
    flex:1
  },
  Title: {
    fontSize: 30,
    fontFamily: 'SemiBold',
    color: 'grey'
  },
  Image: {
    width: 240,
    height: 160,
    marginVertical: 20
  },
  Text: {
    alignSelf:'flex-start'
  },
  BtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 9
  }
})