import { StyleSheet, Text, View, Modal, TouchableOpacity, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import colors from '../utils/colors'
import DropDownTipe from './DropDownTipe'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSourcePropType } from 'react-native';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid } from 'react-native';
import DropdownABC from './DropdownABC'

interface Props {
  visible: boolean;
  onPress?: () => void;
  onPress2?: () => void;
   onPress3?: () => void;
}

const FormTambahProduk: React.FC<Props> = ({ visible, onPress,onPress2,onPress3}) => {
  const [hewan, setHewan] = useState<string | null>('')
  const [tipe,setTipe] = useState<string | null>('')
  const [berat, setBerat] = useState('')
  const [harga, setHarga] = useState('');
  const [gabungan, setGabungan] = useState('');

  const tambah = () => {
    AsyncStorage.getItem('token').then(value => {

      var myHeaders = new Headers();
     myHeaders.append("Authorization", `Bearer ${value}`);

     var formdata = new FormData();
     formdata.append("type_kurban", gabungan);
     formdata.append("harga", harga);
     formdata.append("berat", berat);

     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: formdata,
       redirect: 'follow'
     };

     fetch("https://host.muhammadiyahexpo.com/api/storekurban", requestOptions)
       .then(response => response.json())
       .then(result => {
        console.log(result);
        if (onPress3) {
          onPress3();
        }
      })
       .catch(error => console.log('error', error));
    })
          };
  const handleDropdownSelect1 = (value: string | null) => {
    setHewan(value);
    setGabungan(`${value} - ${tipe}`);
  };
  
  const handleDropdownSelect2 = (value: string | null) => {
    setTipe(value);
    setGabungan(`${hewan}_${value}`);
  };
  

  return (
    <Modal visible={visible} animationType={'slide'}>
      <StatusBar barStyle={'light-content'} backgroundColor={'white'} />
      <TouchableOpacity onPress={onPress2}>
          <Text style={{alignSelf: 'flex-end',fontSize: 25,fontFamily:'SemiBold',color: "black",marginRight: 20}}>X</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontFamily: 'Bold', color: 'black', alignSelf: 'center', margin: 20 }}>Form Tambah Produk</Text>
      <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>

      </View>
      <View style={styles.conterInput}>
        <View style={styles.imageContainer}>

        </View>

        <Text style={styles.name}>hewan kurban</Text>
        <View style={{marginTop: 15,marginBottom: 10}}>
           <DropDownTipe onSelect={handleDropdownSelect1}/>
        </View>
        <Text style={styles.name}>tipe produk</Text>
        <View style={{marginTop: 15}}>
            <DropdownABC onSelect={handleDropdownSelect2}/>
        </View>
      </View>
      <View style={styles.conterInput}>
        <Text style={styles.name}>Berat</Text>
        <TextInput
          style={styles.input}
          onChangeText={(np: string) => setBerat(np)}
        />
      </View>
      <View style={styles.conterInput}>
        <Text style={styles.name}>Harga</Text>
        <TextInput
          style={styles.input}
          onChangeText={(pass: string) => setHarga(pass)}
        />
        <TouchableOpacity onPress={tambah}>
          <View style={{ width: 150, height: 40, backgroundColor: colors.ijoprim, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 70 }}>
            <Text style={{ fontSize: 20, color: 'white', fontFamily: 'SemiBold' }}>Tambah</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default FormTambahProduk

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  conterInput: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  name: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Regular'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.ijoprim,
    marginTop: 5,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  selectedImageText: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
})
