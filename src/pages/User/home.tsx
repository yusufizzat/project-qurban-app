  import { Dimensions, Image, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
  import React, { useEffect, useState } from 'react'
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { RootStackParams } from '../../App';
  import { useIsFocused, useNavigation } from '@react-navigation/native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import colors from '../../utils/colors';
  import MyDrawer from '../../router/Drawer';
  import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
  import Bottom from '../../router/Bottom';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { ScrollView } from 'react-native-gesture-handler';
  import { MenuBars,  ModalProduk,FormIndividu,FormGroup } from '../../components';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import ModalBerhasil from '../../components/modalBerhasil';
  import ModalKambing from '../../components/ModalKambing';


  const Tab = createBottomTabNavigator();
  const width = Dimensions.get('window').width 

  const height = Dimensions.get('window').height -200 ;

  type RootDrawerParamList = {
    Home: undefined;
    TanyaAdmin: undefined;
    Info: undefined;

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

  const Home = () => {
      const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParams>>();

      const isFocused = useIsFocused();
      
      type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList, 'Home'>;
      const Drawer = createDrawerNavigator();
      
      
        const Navigation = useNavigation<DrawerNavigationProps>();
        const handleMenuPress = () => {
          Navigation.toggleDrawer();
        };
        const [selectedId, setSelectedId] = useState<number | null>(null);
        
        const [berhasil, setBerhasil] = useState(false)
        const [modalVisible, setModalVisible] = useState(false)
        const [modalVisibleKambing, setModalVisibleKambing] = useState(false)
        const [modalVisible2, setModalVisible2] = useState(false)
        const [modalVisible3, setModalVisible3] = useState(false)
        const [selectedPrice, setSelectedPrice] = useState<string>(''); // Menyimpan harga terpilih
        const price = selectedPrice !== null ? parseInt(selectedPrice) : 0;
        const [nama, setNama] = useState('')

        const handleModal1ButtonPress = () => {
          setModalVisible(false); // Menutup modal pertama
          setModalVisible2(true); // Menampilkan modal kedua   
        };
        const handleModal1ButtonPressKambing = () => {
          setModalVisibleKambing(false); // Menutup modal pertama
          setModalVisible2(true); // Menampilkan modal kedua   
        };
        const handleFormIn = () => {
          setModalVisible2(false)
        }
        const handleFormIn2 = () => {
          setModalVisible2(false)
          setBerhasil(true)
       }
        const handleModal2ButtonPress = () => {
          setModalVisible(false); // Menutup modal pertama
          setModalVisible3(true); // Menampilkan modal kedua
        

        };
        const [refreshing, setRefreshing] = useState(false);

        const onRefresh = () => {
          setRefreshing(true);
          fetchData();
          setRefreshing(false);
        };
        const [data, setData] = useState<ListData[]>([])
        useEffect(() => {
          fetchData(); // Fetch data on initial load
        }, [])
      
        useEffect(() => {
          if (isFocused) {
            fetchData(); // Fetch data when the screen is focused again
          }
        }, [isFocused]);

        const fetchData = () => {
          AsyncStorage.getItem('token').then(value => {
            console.log(value)

            
            var requestOptions = {
              method: 'GET',
              headers: {Authorization: `Bearer ${value}`},
              redirect: 'follow'
            };
            
            fetch("https://host.muhammadiyahexpo.com/api/semuakurbanuser", requestOptions)
              .then(response => response.json())
              .then(result => {console.log(result.data),setData(result.data)})
              .catch(error => console.log('error', error));
          })
        }
        useEffect(() => {
          AsyncStorage.getItem('nama')
            .then(value => {
              if (value !== null) {
                setNama(value);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }, []);
        
        const filteredDataKambing = data.filter((value) => value.type_kurban.toLowerCase().includes('kambing') || value.type_kurban.toLowerCase().includes('Kambing'));
        const filteredDataSapi = data.filter((value) => value.type_kurban.toLowerCase().includes('sapi') || value.type_kurban.toLowerCase().includes('Sapi'))
        const [namaProduk,setNamaProduk] = useState('')

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
          <MenuBars styles1={styles.icon} onPress={handleMenuPress} color={'white'}/>
            <View style={styles.profile}>
                <Text style={styles.username}>{nama}</Text>
            </View>
              <View style={{width, height,backgroundColor:"#FFFFFF",borderTopEndRadius: 50,borderTopLeftRadius:50}}>
                <Text style={styles.Yuk}>Yuk berqurban !</Text>
                  <Text style={{marginTop: 10,marginBottom: 15,marginLeft: 20,fontFamily:'Regular',fontSize: 20,color:'grey'}}>Kambing</Text>
                  <View style={{flexDirection:'row'}}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                  {filteredDataKambing.map((value, index) => (
                  <TouchableOpacity key={index} onPress={() => {
                    setNamaProduk(value.type_kurban)
                    setSelectedId(value.id);
                    setSelectedPrice(value.harga); // Menyimpan harga terpilih ke dalam state
                    console.log(selectedPrice);
                    setModalVisibleKambing(true);
                  }} style={{ marginLeft: 20 }}>
                    <View>
                      <Text style={styles.tipe}>{value.type_kurban.replace(/_/g, ' ')}</Text>
                      <Text style={styles.berat}>{value.berat}</Text>
                      <Text style={styles.Harga}>{value.harga}</Text>
                      <Image source={require('../../assets/images/kambingtipe.png')} style={styles.Image}/>
                    </View>
                  </TouchableOpacity>
                ))}
                  <View style={{padding: 20}}/>
                  </ScrollView>
                  </View>
                  <Text style={{marginTop: 20,marginBottom: 10,marginLeft: 20,fontFamily:'Regular',fontSize: 20,color:'grey'}}> Sapi</Text>
                  <View style={{flexDirection:'row'}}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                  {filteredDataSapi.map((value, index) => (
                  <TouchableOpacity key={index} onPress={() => {
                    setNamaProduk(value.type_kurban)
                    setSelectedId(value.id);
                    setSelectedPrice(value.harga); // Menyimpan harga terpilih ke dalam state
                    console.log(selectedPrice);
                    setModalVisible(true);
                  }} style={{ marginLeft: 20 }}>
                    <View>
                      <Text style={styles.tipe}>{value.type_kurban.replace(/_/g, ' ')}</Text>
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
          </View>
        <FormGroup visible={modalVisible3} onPress={() => setModalVisible3(false)} selectedId={selectedId} price={price} namaP={namaProduk}/>
        <FormIndividu visible={modalVisible2} onPress={handleFormIn} selectedId={selectedId} price={price} onPress2={handleFormIn2} namaP={namaProduk}/>
        <ModalProduk visible={modalVisible} onPress={() => setModalVisible(false)} onPressOrderIndividu={handleModal1ButtonPress} onPressOrderGroup={handleModal2ButtonPress} />
        <ModalBerhasil visible={berhasil} onPress={() => setBerhasil(false)}/>
        <ModalKambing visible={modalVisibleKambing} onPress={() => setModalVisibleKambing(false)} onPressOrderIndividu={handleModal1ButtonPressKambing}/>
    </ScrollView>

      </>
    )
  }

  export default Home

  const styles = StyleSheet.create({
      icon: {
          marginLeft: 20,
          marginTop: 25,

      },container: {
          flex: 1,
          backgroundColor: colors.ijoprim,
          justifyContent:'flex-end',
        },
        username: {
          
          fontSize: 30,
          fontFamily:'SemiBold',
          color: '#FFFFFF',
          alignSelf:'center'
        },
        Image: {
          width: 257,
          height: 170,
          borderRadius: 20
        },
        Item: {
          flexDirection: 'row',
          paddingHorizontal: 20,
        },
        Yuk: {
          marginTop: 35,
          alignSelf:'center',
          fontSize: 20,
          fontFamily: 'SemiBold',
          color: 'grey'
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
        },
        profile: {
          margin: 20,
          alignItems:'center'
        },Harga: {
          fontFamily:'Bold',
          position:'absolute',
          zIndex: 1,
          top: 120,
          left: 20,
          color: 'white',
          fontSize: 17
        }
  })

