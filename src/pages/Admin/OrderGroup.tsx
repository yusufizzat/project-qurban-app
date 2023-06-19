import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../utils/colors'
import DropdownComponent from '../../components/DropDownSelect'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropdownPopup from '../../components/DropdownPopup'

const width = Dimensions.get('window').width 

const height = Dimensions.get('window').height -160;
interface ListData {
  nama_masjid: number  
  nama:string
  id_kurban: string
  id_user: string
  total_harga: number
  created_at: string
  updated_at: string
  status: string
  id: string
  
}


const OrderGroup = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const handleDropdownSelect = (value: string) => {
    setSelectedValue(value);
    // Lakukan apa pun yang perlu dilakukan dengan data yang diterima
    console.log('Nilai dropdown terpilih:', value);
  };
  const [data, setData] = useState<ListData[]>([])
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${value}`);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("https://host.muhammadiyahexpo.com/api/tampilkanordergrup", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result),setData(result.data)})
        .catch(error => console.log('error', error));
    })
  },[])
  const [selectedId,setSelectedId] = useState('')
  const [popup, setPopup] = useState(false)
  const handleStatus = (id: string) => {
    setPopup(true)
    setSelectedId(id)
  }

  
  return (
    <>
    <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent/>
    <View style={[styles.BG1,StyleSheet.absoluteFillObject]}/>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.riwayaa}>riwayat</Text>
      <View style={{width, backgroundColor:"#FFFFFF",borderTopEndRadius: 50,borderTopLeftRadius:50,paddingHorizontal:20}}>
            <Text style={styles.Title}>kurban patungan</Text>
            {data.map((value,index) => (
            <View style={styles.riwayatcontainer} key={index}>
              <Text style={styles.namaMasjid}>{value.nama_masjid}</Text>
              <Text style={styles.namaOrang}>{value.nama}</Text>
              <Text style={styles.riwayat}>id produk : {value.id_kurban}</Text>
              <Text style={styles.riwayat}>id user: {value.id_user}</Text>
              <Text style={styles.riwayatHarga}>{value.total_harga}.000.000</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>

              <View style={{flexDirection:'column'}}>
                <Text style={styles.riwayat}>Status :</Text>
                <Text style={{fontFamily:'SemiBold',fontSize: 15}}>{value.status}</Text>
              </View>
            <TouchableOpacity onPress={() => handleStatus(value.id)}>
              <View
                style={{
                  backgroundColor: colors.ijoprim,
                  width: 70,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'SemiBold',
                    color: 'white',
                  }}
                >
                  Status
                </Text>
              </View>
            </TouchableOpacity>
              </View>
          </View>
          ))}
      </View>
      </View>
    </ScrollView>
    <DropdownPopup visible={popup} onPress={() => setPopup(false)} onPress2={() => setPopup(false)} selectedId={selectedId}/>
    </>
  )
}

export default OrderGroup

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
    marginTop: 25,
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
  namaMasjid: {
    fontSize: 20,
    fontFamily: 'SemiBold'
  },
  namaOrang: {
    fontSize: 17,
    fontFamily:'Regular'
  }
})