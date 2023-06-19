import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../utils/colors'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { FormTambahProduk,Popup,MenuBars } from '../../components';
import { FlatGrid } from 'react-native-super-grid';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import modalBerhasil from '../../components/modalBerhasil';
import ModalHapusBerhasil from '../../components/ModalHapusBerhasil';
import EditProduk from '../../components/editProduk';
import ModalBerhasilPesan from '../../components/ModalBerhasilPesan';
import { useIsFocused } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

const width = Dimensions.get('window').width 
 

const height = Dimensions.get('window').height -160;
type RootDrawerParamList = {
  homeAdmin: undefined;
  pesan: undefined;

};
interface ListData {
  id: number
  type_kurban:string
  harga: string
  berat: string
  image: string
  created_at: string
  updated_at: string
}

const HomeAdmin = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const isFocused = useIsFocused();
  type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList, 'homeAdmin'>;
  const Drawer = createDrawerNavigator();
  const handleMenuPress = () => {
    Navigation.toggleDrawer();
  };
  
    const Navigation = useNavigation<DrawerNavigationProps>();
  const navigation =
useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const window = useWindowDimensions()
  const [data, setData] = useState<ListData[]>([])
  const [modalVisible,setModalVisible] = useState<boolean>(false)
  const [popup,setPopup] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>();
  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, [])

  useEffect(() => {
    if (isFocused) {
      fetchData(); // Fetch data when the screen is focused again
    }
  }, [isFocused]);
  const fetchData = () => {
    AsyncStorage.getItem('token').then((value: any) => {
      console.log(value)

      var requestOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${value}` },
        redirect: 'follow'
      };

      fetch("https://host.muhammadiyahexpo.com/api/semuakurban", requestOptions)
        .then(response => response.json())
        .then(result => { console.log(result.data), setData(result.data) })
        .catch(error => console.log('error', error));
    })
  }

  const Hapus = () => {
    console.log(selectedId);
    
    AsyncStorage.getItem('token').then(value => {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${value}`);
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      fetch(`https://host.muhammadiyahexpo.com/api/deletekurbannn/${selectedId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setPp(true)
        })
        .catch(error => console.log('error', error));
    })
  }

  

  const handleDeleteProduct = () => {
    Hapus();
    setSelectedId(undefined);
    setPopup(false);
  };


  const handleProductPress = (id: number) => {
    setSelectedId(id);
    setPopup(true);
    
  };
  const [pp,setPp] = useState(false)
  const [edit,setEdit]= useState(false)
  const [berhasil,setBerhasil] = useState(false)
  const [berhasil2,setBerhasil2] = useState(false)
  const handlePopup2 =() => {
    setEdit(false)
    setPopup(false)
    setBerhasil2(true)
  }
  const handlePopup =() => {
    setModalVisible(false)
    setPopup(false)
    setBerhasil(true)
  }
  const filteredDataKambing = data.filter((value) => value.type_kurban.toLowerCase().includes('kambing') || value.type_kurban.toLowerCase().includes('Kambing'));
  const filteredDataSapi = data.filter((value) => value.type_kurban.toLowerCase().includes('sapi') || value.type_kurban.toLowerCase().includes('Sapi'))
  return (
    <>
    
    <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent/>
    <ScrollView
       horizontal={true}
       showsHorizontalScrollIndicator={false}
       refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
     }
    >

   
       <View style={styles.container}>
       {/* <MenuBars styles1={styles.icon} onPress={handleMenuPress} color={'white'}/> */}
            <View style={styles.profile}>
            <MenuBars  onPress={handleMenuPress} color={'white'}/>
            <View style={{flex: 1}}>
                <Text style={{        fontSize: 30,
                    fontFamily:'SemiBold',
                    color: '#FFFFFF',
                    alignSelf:'center',
                  }}>
                    Admin
                </Text>
            </View>
            <MenuBars color={colors.ijoprim}/>

            </View>
        <View style={{width, height,backgroundColor:"#FFFFFF",borderTopEndRadius: 50,borderTopLeftRadius:50}}>
          <Text style={styles.Title}>Produk</Text>
          <View style={{flexDirection:'row',alignSelf:'flex-start',marginLeft:15}}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Tambah Produk</Text>
            </View>
          </TouchableOpacity>
          
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {filteredDataKambing.map((value,index) => (
      
                        <TouchableOpacity key={index}  style={{marginLeft:20}} onPress={() => handleProductPress(value.id)}>
                        <View >
                          <Text style={styles.tipe}>{value.type_kurban.replace(/_/g,' ')}</Text>
                          <Text style={styles.berat}>{value.berat}</Text>
                          <Text style={styles.Harga}>{value.harga}</Text>
                          <Image source={require('../../assets/images/kambingtipe.png')} style={styles.Image}/>
                        </View>
                        </TouchableOpacity> 

                    ))}
                    <View style={{padding: 20}}/>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {filteredDataSapi.map((value,index) => (
      
                        <TouchableOpacity key={index}  style={{marginLeft:20}} onPress={() => handleProductPress(value.id)}>
                        <View >
                          <Text style={styles.tipe}>{value.type_kurban.replace(/_/g,' ')}</Text>
                          <Text style={styles.berat}>{value.berat}</Text>
                          <Text style={styles.Harga}>{value.harga}</Text>
                          <Image source={require('../../assets/images/sapitipe.png')} style={styles.Image}/>
                        </View>
                        </TouchableOpacity> 
                    ))}
                    <View style={{padding: 20}}/>
                </ScrollView>
        </View>
      </View>
      <FormTambahProduk visible={modalVisible} onPress2={() => setModalVisible(false)} onPress3={handlePopup}/>
      <EditProduk visible={edit} onPress2={() => setEdit(false)} id={selectedId} onPress3={handlePopup2}/>
      <Popup visible={popup} onPress={() => setPopup(false)} selectedId={selectedId} onPress2={handleDeleteProduct} onPress3={() => setEdit(true)}/>
      <ModalHapusBerhasil visible={pp} onPress={() => setPp(false)}/>
      <ModalBerhasilPesan title='Berhasil di Tambah' visible={berhasil} onPress={() => {setBerhasil(false)}}/>
      <ModalBerhasilPesan title='Berhasil di Edit' visible={berhasil2} onPress={() => {setBerhasil2(false)}}/>
      </ScrollView>
    </>
  )
}

export default HomeAdmin

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.ijoprim,
    justifyContent:'flex-end',
  },
  profile: {
    margin: 20,
    flexDirection:'row'
  },
  Title: {
    marginVertical: 30,
    alignSelf:'center',
    fontSize: 20,
    fontFamily: 'SemiBold',
    color: 'grey'
  },
  button: {
    marginRight: 15,
    backgroundColor: colors.ijosec,
    padding:10,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 10,
    fontFamily:'SemiBold',
    color: 'white'
  },
  button2: {
    marginRight: 15,
    backgroundColor: '#e74c3c',
    padding:10,
    borderRadius: 10,
    marginBottom: 20,
  },tipe: {
    position:'absolute',
    zIndex: 1,
    top: 20,
    left: 20,
    fontSize:20,
    fontFamily: 'SemiBold',
    color: 'white'
  },berat: {
    position:'absolute',
    zIndex: 1,
    top: 85,
    left: 20,
    color: 'black'
  },Harga: {
    fontFamily:'Bold',
    position:'absolute',
    zIndex: 1,
    top: 120,
    left: 20,
    color: 'white',
    fontSize: 17
  },Image: {
    width: 257,
    height: 170,
    borderRadius: 20
  },
})