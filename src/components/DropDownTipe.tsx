import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';


const data = [
    { label: 'Kambing', value: 'Kambing' },
    { label: 'Sapi', value: 'Sapi' },
  ];
  interface DropdownComponentProps {
    onSelect: (value: string | null) => void;
  }
const DropDownTipe: React.FC<DropdownComponentProps> = ({ onSelect }) => {
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

export default DropDownTipe

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
