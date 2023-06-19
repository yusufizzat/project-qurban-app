import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import colors from '../utils/colors'

interface Props {
    styles2?:ViewStyle
    Icon2: string
    onPress?: () => void
}

const CheckButton = ({styles2,Icon2,onPress}: Props) => {
  return (
    <TouchableOpacity style={[{...styles2},{backgroundColor: colors.ijoprim,width:50,height: 50,borderRadius: 50,alignItems:'center',justifyContent:'center'}]}onPress={onPress}>
      <View>
          <Icon name={Icon2}size={25} style={{color: '#FFFFFF'}}/>
      </View> 
    </TouchableOpacity>
  )
  
}

export default CheckButton

const styles = StyleSheet.create({})