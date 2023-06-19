import { Dimensions, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../utils/colors'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MenuBars } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get('window').width 
// mengurangi 150 dari atas
const height = Dimensions.get('window').height;


interface ListData {
  id: number
  id_user: number
  id_kurban: 21
  nama_masjid: string
  nama: string
  harga: number
  status: string
  created_at: string
}

type RootDrawerParamList = {
  Home: undefined;
  TanyaAdmin: undefined;
  Info: undefined;

};

const History = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, [])

  useEffect(() => {
    if (isFocused) {
      fetchData(); // Fetch data when the screen is focused again
    }
  }, [isFocused]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };
  type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList, 'Home'>;
  const Drawer = createDrawerNavigator();
  
  
    const Navigation = useNavigation<DrawerNavigationProps>();
    const handleMenuPress = () => {
      Navigation.toggleDrawer();
    };
    const [data, setData] = useState<ListData[]>([])
    const fetchData = () => {
      AsyncStorage.getItem('token').then(value => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${value}`);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://host.muhammadiyahexpo.com/api/tampilanuser", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            const sortedData = result.data.sort((a: ListData, b: ListData) => {
              const dateA = new Date(a.created_at).getTime();
              const dateB = new Date(b.created_at).getTime();
              return dateB - dateA;
            });
            setData(sortedData);
          })
          .catch(error => console.log('error', error));
      })
    }
    
  return (
    <>
    <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent/>
    <View style={[styles.BG1,StyleSheet.absoluteFillObject]}/>
    <ScrollView
 
       showsHorizontalScrollIndicator={false}
       refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
     }>
      <View style={styles.container}>
      <MenuBars styles1={styles.icon} onPress={handleMenuPress} color={'white'}/>
        <Text style={styles.riwayaa}>riwayat</Text>
      <View style={{width, backgroundColor:"#FFFFFF",borderTopEndRadius: 50,borderTopLeftRadius:50,paddingHorizontal:20}}>
            <Text style={styles.Title}>kurban</Text>
            {data.map((value,index) => (
              <View style={styles.riwayatcontainer} key={index}>
                <Text style={styles.riwayat1}>{value.nama}</Text>
                <Text style={styles.riwayat}>{value.nama_masjid}</Text>
                <Text style={styles.riwayatHarga}>{value.harga}.000.000</Text>
                <Text>Status :{'\n'}{value.status}</Text>
                <Text>{value.created_at}</Text>
              </View>
            ))}
      </View>
      </View>
    </ScrollView>
    </>
  )
}

export default History

const styles = StyleSheet.create({
  icon: {
    marginLeft: 20,
    marginTop: 25,

},container: {
  flex: 1,
  backgroundColor: colors.ijoprim,
  justifyContent:'flex-end',
},emptyHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    backgroundColor:'white'
  },
  riwayaa: {
    margin: 20,
    fontSize: 30,
    fontFamily:'SemiBold',
    color: '#FFFFFF',
    alignSelf:'center'
  },
  Title: {
    marginTop: 60,
    alignSelf:'center',
    fontSize: 20,
    fontFamily: 'SemiBold',
    color:'grey'
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
    top: 80,
    left: 20,
    color: 'black'
  },
  riwayatcontainer: {
    backgroundColor:'#ffffff',
    elevation:2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginTop:20
  },
  riwayat: {
    fontSize: 17,

  },
  riwayatHarga: {
    fontSize: 15,
  },
  BG1: {
    flex:1,
    backgroundColor:'white'
  },
  riwayat1: {
    fontSize: 20,
    fontFamily:'SemiBold'

  },
})