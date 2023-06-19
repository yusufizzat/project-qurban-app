import { Dimensions, StatusBar, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Button2 from './button2';
import colors from '../utils/colors';
import Modal from "react-native-modal";
import { RootStackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

interface Props  {
    visible: boolean;
    onPress?: () => void,
    onPressOrderIndividu?: () => void,
    onPressOrderGroup?: () => void,
}


const ModalProduk: React.FC<Props> = ({visible,onPress,onPressOrderIndividu,onPressOrderGroup}) => {



  return (
    <>
        <Modal isVisible={visible} animationIn="zoomIn" animationOut='fadeOut'>
          <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={{alignSelf:'flex-end'}}>
              <Text style={{fontSize: 20,fontFamily:'Bold'}}>X</Text>  
            </TouchableOpacity>
            <Text style={{fontSize: 25,fontFamily:'SemiBold',marginBottom: 30}}>Opsi Pemesanan</Text>
            <Button2 title={'Order Individu'} color1={colors.ijoprim} styles1={styles.button} icon1={'user'} onPress={onPressOrderIndividu}/>
            <Button2 title={'Order Group'} color1={'#af6c53'} styles1={styles.button} icon1={'users'} onPress={onPressOrderGroup}/>
          </View>
        </Modal>
    </>
  )
}

export default ModalProduk

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
    marginBottom:20
  }
})

// onPress={() => !visible

