import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';


const data = [
    { label: 'tipe A', value: 'type_A' },
    { label: 'type B', value: 'type_B' },
    { label: 'type C', value: 'type_C' },
    { label: 'type D', value: 'type_D' },
    { label: 'type E', value: 'type_E' },
    { label: 'type F', value: 'type_F' },
    { label: 'type G', value: 'type_G' },
    { label: 'type H', value: 'type_H' },
    { label: 'type I', value: 'type_I' },
    { label: 'type J', value: 'type_J' },
    { label: 'type K', value: 'type_K' },
    { label: 'type L', value: 'type_L' },
    { label: 'type M', value: 'type_M' },
    { label: 'type N', value: 'type_N' },
  ];
  interface DropdownComponentProps {
    onSelect: (value: string | null) => void;
  }
const DropdownABC: React.FC<DropdownComponentProps> = ({ onSelect }) => {
    const [value, setValue] = useState<string | null>('');
    const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
  
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? 'Hewan Kurban' : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
        onSelect(item.value); // Panggil fungsi onSelect di sini
      }}
    />
  </View>
  )
}

export default DropdownABC

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
      },
      dropdown: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})

function onValueChange(value: string) {
  throw new Error('Function not implemented.');
}
