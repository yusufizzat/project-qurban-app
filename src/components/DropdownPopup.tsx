import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropdownComponent from './DropDownSelect';
import colors from '../utils/colors';
interface Props {
    visible: boolean
    onPress: () => void
    onPress2: () => void
    selectedId: string | null;
}


const DropdownPopup: React.FC<Props> = ({visible,onPress,onPress2,selectedId}) => {
    const [selectedValue, setSelectedValue] = useState<string | null>('');
    const handleDropdownSelect = (value: string | null) => {
        setSelectedValue(value);
        
      };
    useEffect(() => {
  if (selectedValue) {
    console.log(selectedValue);
  }
}, [selectedValue]);

    const Status = () => {
        AsyncStorage.getItem('token').then(value => {
      
        
               var myHeaders = new Headers();
              myHeaders.append("Authorization",`Bearer ${value}`);
        
              var formdata = new FormData();
               formdata.append("status", selectedValue);
              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
              };
        
              fetch(`https://host.muhammadiyahexpo.com/api/status/${selectedId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                              console.log(result);
                              onPress2()
                            })
                .catch(error => console.log('error', error));
        })
      }
  return (
    <>
    <Modal isVisible={visible} animationIn="zoomIn" animationOut='fadeOut'>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={{alignSelf:'flex-end'}}>
              <Text style={{fontSize: 20,fontFamily:'Bold'}}>X</Text>  
            </TouchableOpacity>
            <Text>Pilih Status</Text>
            <DropdownComponent onSelect={handleDropdownSelect} />
            <TouchableOpacity onPress={Status}>
                <View style={{backgroundColor: colors.ijoprim, padding:2,alignItems:'center',justifyContent:'center',borderRadius: 10,marginTop: 20}}>
                    <Text style={{color: 'white',fontFamily:'SemiBold',fontSize: 20}}>Submit</Text>
                </View>
            </TouchableOpacity>
      </View>
    </Modal>
</>
  )
}

export default DropdownPopup


const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 15,
      justifyContent:'center',
      backgroundColor:'white',
      borderRadius: 20,
      paddingBottom: 30
    },
    button: {
      marginBottom:20,
      justifyContent:'center'
    }
  })
  