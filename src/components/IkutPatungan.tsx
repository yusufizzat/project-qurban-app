import { StyleSheet, Text, View, TextInput, Dimensions,TouchableOpacity } from 'react-native'
import React, { useState } from 'react' 
import Modal from "react-native-modal";
import colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    onPress?: () => void
    onPress2?: () => void
    harga:number
    visible: boolean
    id: number
}

const IkutPatungan: React.FC<Props> = ({onPress,visible,harga,id,onPress2}) => {
    const [nama,setNama] = useState('')
    const handleTextChange = (text: any) => {
        setNama(text)
      }
      const Ikut = () => {
        AsyncStorage.getItem('token').then(value => {

            var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${value}`);
    
                var formdata = new FormData();
                formdata.append("nama", `. ${nama}`);
                formdata.append("total_harga", harga);
    
                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
                };
    
                fetch(`https://host.muhammadiyahexpo.com/api/patunganordergrup/${id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if(result.message == "kamu berhasil patungan") {
                      if (onPress2) {
                        onPress2();
                      }
                    }
                  })
                .catch(error => console.log('error', error));
        })
                }
  return (
    <Modal isVisible={visible}>
        <View style={{backgroundColor:'white',alignSelf:'center',borderRadius: 20,paddingHorizontal: 20}}>
            <TouchableOpacity onPress={onPress}>
                <View>
                    <Text style={{fontSize: 17,fontFamily:'SemiBold',marginTop: 10,alignSelf:'flex-end',color: 'grey'}}>X</Text>
                </View>
            </TouchableOpacity>
            <Text style={{color: 'grey',fontSize: 20,fontFamily: "SemiBold",marginBottom: 20,marginTop: 20,alignSelf:'center'}}>IkutPatungan</Text>
            <Text style={styles.Text}>Nama</Text>
          <TextInput 
            style={styles.textInput1}
            value={nama}
            onChangeText={text => handleTextChange(text)}
          />
          <TouchableOpacity onPress={Ikut}>
                <View style={{backgroundColor: colors.ijoprim,padding: 10,borderRadius: 10,marginBottom:20,alignSelf:'center'}}>
                    <Text style={{color: 'white',fontFamily: 'SemiBold'}}>Ikut patungan</Text>
                </View>
          </TouchableOpacity>
        </View>
    </Modal>
  )
}

export default IkutPatungan
const width = Dimensions.get('window').width -70
const styles = StyleSheet.create({
    Text: {
        alignSelf:'flex-start',
        color: 'grey'
      },
      textInput1: {
        borderBottomWidth: 1,
        width,
        borderBottomColor:colors.ijosec,
        color:'black',
        marginBottom: 20
      },
})