import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/colors'



interface Props {
    title: string,
    onPress?: () => void,
    width: number,
    textColor: string,
    borderWidth?: number
    color: string 
}

const Button: React.FC<Props>=({title,onPress,width,textColor,borderWidth,color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={{
        borderWidth: borderWidth,
        borderColor: colors.ijoprim,
        width:width,
        height:60,
        backgroundColor: color,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 100,
        marginHorizontal: 7,
    }}>
        <Text style={{fontSize: 25,fontFamily: 'SemiBold',color: textColor}}>{title}</Text>
    </View>
</TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    
})