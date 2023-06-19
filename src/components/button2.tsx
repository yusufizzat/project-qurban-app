import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/colors'
import Icon from 'react-native-vector-icons/FontAwesome'



interface Props {
    title: string,
    onPress?: () => void,
    color1: string
    styles1?:ViewStyle
    icon1?: string
}

const Button2: React.FC<Props>=({title,onPress,color1,styles1,icon1}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={[{
        width:270,
        height:60,
        backgroundColor: color1,
        alignItems: 'center',
        borderRadius: 100,
        flexDirection:'row',
        paddingHorizontal:20
    },[{...styles1}]]}>
        {icon1 && <Icon name={icon1} size={26} color={'white'} style={{ marginRight: 20 }} />}
        <Text style={{fontSize: 25,fontFamily: 'SemiBold',color: 'white',textAlign:'center'}}>{title}</Text>
    </View>
</TouchableOpacity>
  )
}

export default Button2

const styles = StyleSheet.create({
    
})