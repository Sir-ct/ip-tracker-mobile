import { StatusBar } from 'expo-status-bar';
import MapView, {Marker} from 'react-native-maps'
import { StyleSheet, SafeAreaView, Dimensions, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location'

let {height, width} = Dimensions.get('window')
export default function App() {

  let [coordsinfo, setCoordsInfo] = useState(null)

 useEffect(()=>{
   fetch("https://api.bigdatacloud.net/data/ip-geolocation-with-confidence?key=bdc_eb90e5a2dae34e0b8df1a5b488a0ca8f").then((res)=> (res.json())).then((data)=>{
    console.log(data.country)
  })
 },[])

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      Location.enableNetworkProviderAsync().then(res=>(res.json())).then((res)=>{
        console.log("enablenetwork", res)
      }).catch((err)=>{
        console.log(err)
        console.log("network permission denied")
      })
        
      

     

      let location = await Location.getCurrentPositionAsync();
      setCoordsInfo(location)
      
      
    })();
  }, []);

  console.log(coordsinfo)

  return (
    <SafeAreaView>
      <View style={styles.topbgview}>
        <ImageBackground style={{width: '100%', height: '100%'}} source={require('./assets/images/pattern-bg.png')}>
      
        </ImageBackground>
      </View>

      <View style={styles.mapcontainer}>
         <MapView style={{width: '100%', height: '100%'}} region={{
          latitude: coordsinfo ? coordsinfo.coords.latitude : 0,
          longitude: coordsinfo ? coordsinfo.coords.longitude : 0,
          longitudeDelta: 0.0068,
          latitudeDelta: 0.0041
         }}> 
            <Marker draggable coordinate={{longitude: coordsinfo ? coordsinfo.coords.longitude : 0, latitude: coordsinfo ? coordsinfo.coords.latitude : 0}} /> 
         </MapView>

            <View style={styles.topdetailsview}>
            <Text style={{fontSize: 24, color: 'white', fontWeight: '600'}}>IP Address Tracker</Text>

            <View style={{width: '100%', flexDirection: 'row', margin: 10}}>
              <TextInput value='some ip address' style={styles.searchbar} />
              <TouchableOpacity style={styles.searchbtn}> 
                <Text style={{color: 'white', fontSize: 30}}> {">"} </Text>   
              </TouchableOpacity>
            </View>

            <View style = {styles.infotab}>
              <Infotab name={'ip address'}  />
              <Infotab name={'location'} />
              <Infotab name={'timezone'} />
              <Infotab name={'isp'} />
            </View>
          </View>

      </View>
    </SafeAreaView>
  );
}

function Infotab(props){
  return(
    <View style={{alignItems: 'center', margin: 5}}>
      <Text style={{textTransform: 'uppercase', fontSize: 12, color: 'gray', fontWeight: '700'}}>{props.name}</Text>
      <Text style={{textTransform: 'capitalize', fontSize: 20, fontWeight: '700'}}> info enters here </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   paddingTop: 20
  },
  topbgview: {
    height: height * 0.3,
    backgroundColor: 'black'
  },
  topdetailsview: {
    paddingTop: 20,
    width: '80%',
    position: 'absolute',
    top: height * -0.3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  searchbar: {
    backgroundColor: 'white',
    width: '80%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 20,
    height: 50
  },
  searchbtn: {width: '20%', 
  backgroundColor: 'black', 
  alignItems: 'center',
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10
 },
 infotab: {
  width: '100%',
  backgroundColor: 'white',
  padding: 20,
  margin: 10,
  borderRadius: 10,
 // borderWidth: 1,
  shadowOpacity: 1,
  shadowColor: 'black',
 // shadowOffset: {width: 100, height: 200},
  elevation: 20,
  //borderColor: 'black'
 },
 mapcontainer: {
  backgroundColor: 'black',
  height: height * 0.9,
 }
});
