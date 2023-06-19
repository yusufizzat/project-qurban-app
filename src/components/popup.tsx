import { Dimensions, StatusBar, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Button2 from './button2';
import colors from '../utils/colors';
import Modal from "react-native-modal";
import { RootStackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props  {
    visible: boolean;
    onPress?: () => void,
    selectedId: number | undefined
    onPress2 : () => void
    onPress3: () => void
    
}


const Popup: React.FC<Props> = ({visible,onPress,selectedId,onPress2,onPress3}) => {


  const [isPopupVisible, setPopupVisible] = useState(false);

  return (
    <>
        <Modal isVisible={visible} animationIn="zoomIn" animationOut='fadeOut'>
          <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={{alignSelf:'flex-end'}}>
              <Text style={{fontSize: 20,fontFamily:'Bold'}}>X</Text>  
            </TouchableOpacity>
            <Button2 title={'edit produk'} color1={colors.ijoprim} styles1={styles.button}  onPress={onPress3}/>
            <Button2 title={'hapus produk'} color1={'#af6c53'} styles1={styles.button}  onPress={onPress2}/>
          </View>
        </Modal>
    </>
  )
}

export default Popup

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius: 20
  },
  button: {
    marginBottom:20,
    justifyContent:'center'
  }
})

// onPress={() => !visible

