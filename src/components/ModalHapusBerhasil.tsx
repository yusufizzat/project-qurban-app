import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../utils/colors';

interface Props {
    onPress?: () => void
    visible: boolean
}
const ModalHapusBerhasil: React.FC<Props> = ({onPress,visible}) => {
    return (
        <>
            <Modal isVisible={visible}>
                <View style={{height: 200,width: 250,backgroundColor:'white',alignSelf:'center',alignItems:'center',borderRadius: 20}}>
                <TouchableOpacity onPress={onPress} style={{alignSelf:'flex-end',marginRight: 10,marginTop: 10}}>
                  <Text style={{fontSize: 17,fontFamily:'Bold'}}>X</Text>  
                </TouchableOpacity>
                    <Icon name={'trash'} size={50} color={colors.ijoprim} style={{marginTop: 10}}/>
                     <Text style={{fontSize: 20,fontFamily:'SemiBold',color:'black',marginTop: 25}}>Berhasil di Hapus</Text>
                </View>
            </Modal>
        </>
      )
}

export default ModalHapusBerhasil

const styles = StyleSheet.create({})