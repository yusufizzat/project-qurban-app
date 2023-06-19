import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MenuBars } from '../../components'
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../utils/colors';
import ModalHapusBerhasil from '../../components/ModalHapusBerhasil';
type RootDrawerParamList = {
  homeAdmin: undefined;
  pesan: undefined;

}; 
interface ListData {
  id: number
  nama:string
  email: string
  no_hp: number
  pesan: string
}
const Pesan = () => {
  const [pp,setPP] = useState(false)
  const [selectedId,setSelectedId] = useState<number>()
  const [data, setData] = useState<ListData[]>([])
  const hapus = () => {
    AsyncStorage.getItem('token').then(value => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${value}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://host.muhammadiyahexpo.com/api/deletepesan/${selectedId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setPP(true)
        })
        .catch(error => console.log('error', error));
          })
        }
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      console.log(value);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${value}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://host.muhammadiyahexpo.com/api/semuapesan", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result.data),setData(result.data)})
        .catch(error => console.log('error', error));
      
    })
  },[])
  type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList, 'homeAdmin'>;
  const Drawer = createDrawerNavigator();
  const handleMenuPress = () => {
    Navigation.toggleDrawer();
  };
  const Navigation = useNavigation<DrawerNavigationProps>();
  const HandleDelete = (id:number) => {
    setSelectedId(id)
    hapus()
    
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{flex: 1,paddingTop: 25,paddingHorizontal: 15,backgroundColor:'white'}}>
      <MenuBars  onPress={handleMenuPress} color={'black'}/>
      <Text style={{alignSelf:'center',fontFamily:'SemiBold',color: 'black',fontSize: 25}}>Pesan</Text>
      <View>
        {data.map((value,index) => (
          <View style={{backgroundColor:'white', elevation: 5,marginVertical: 10,borderRadius: 10,padding:10}}key={index}>
            <Text style={{color: 'black',fontFamily:'SemiBold',fontSize: 17}}>{value.nama}</Text>
            <Text>{value.email}</Text>
            <Text style={{marginBottom: 10}}>{value.no_hp}</Text>
            <Text style={{color: 'black',fontFamily:'SemiBold',fontSize: 17}}>Pesan :</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize: 15}}>{value.pesan}</Text>
              <TouchableOpacity onPress={() => HandleDelete(value.id)}>
                <View style={{backgroundColor:colors.ijoprim,width: 60,height:25,justifyContent:'center',alignItems:'center',borderRadius:7}}>
                  <Text style={{color: 'white',fontFamily:'SemiBold'}}>
                    Hapus
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
    <ModalHapusBerhasil visible={pp} onPress={() => setPP(false)}/>
    </ScrollView>
  )
}

export default Pesan

const styles = StyleSheet.create({
  BG1: {
    flex:1,
    backgroundColor:'white'
  },
})