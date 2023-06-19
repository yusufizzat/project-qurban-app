import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';



  interface Props {
    styles1?:ViewStyle
    onPress?: () => void
    color: string
}

const MenuBars: React.FC<Props> = ({styles1,onPress,color}) => {

    return(
    <TouchableOpacity style={[{...styles1}]} onPress={onPress} >
        <Icon name='bars' size={26} color={color} />
    </TouchableOpacity>
         )
    }

export default MenuBars

const styles = StyleSheet.create({})