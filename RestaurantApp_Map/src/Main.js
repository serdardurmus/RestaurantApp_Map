import Axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {SafeAreaView, View, FlatList, Text} from 'react-native';
// import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';
import {City, RestaurantDetail, SearchBar} from './components';

// filtreleme yapacağım için listenin orjinalini saklıyorum
let originalList = [];

const Main = (props) => {

  // data geldi. datayı saklamam ve kullanıcıya liste formatında göstermem gerekiyor. Bunu useState ile yaparım
  const [cityList, setCityList] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const mapRef = useRef(null);

  const fetchCities = async () => {
    const {data} = await Axios.get("https://opentable.herokuapp.com/api/cities");
    
    setCityList(data.cities);
    
    // şehirlerin aynısını birebire buraya kaydediyoruz
    originalList = [...data.cities];

    // verilerin gelip gelmediğini kontrol ettik
    // console.log(data);
  };

  // uygulama açıldığında gerçekleşmesi için useEffect kullandık
  useEffect(() => {
    fetchCities();
  }, []);

  const onCitySearch = (text) => {
    const filteredList = originalList.filter(item => {
      const userText = text.toUpperCase();
      const cityName = item.toUpperCase();

      return cityName.indexOf(userText) > -1;
    })

    // her harfi alıp almadığımızı kontrol ediyoruz
    // console.log(text);

    setCityList(filteredList);
  };

  const onCitySelect = async (city) => {
    const {data: {restaurants}} = await Axios.get("https://opentable.herokuapp.com/api/restaurants?city="+ city );
    setRestaurants(restaurants);

    const restaurantsCoordinates = restaurants.map( res => {
      return ({
          latitude: res.lat,
          longitude: res.lng,
      });
    });
    mapRef.current.fitToCoordinates(restaurantsCoordinates, {
      edgePadding: {
        top: 300,
        right: 25,
        bottom: 25,
        left: 25
      },
    });

    console.log(restaurants);  
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapView
          ref={mapRef}
          style={{flex: 1}}
          initialRegion={{
            // San Francisco
            // latitude: 37.78825,
            // longitude: -122.4324,

            // Kansas City
            latitude: 39.069197,
            longitude: -94.629322,

            // Drammen
            // latitude: 59.744478,
            // longitude: 10.204767,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
            {restaurants.map((r, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: r.lat,
                  longitude: r.lng,
                }}
                // title={marker.title}
                // description={marker.description}
              />
            ))}
        </MapView>
        <View style={{position: "absolute"}}>
        <SearchBar onSearch={onCitySearch} />
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          data={cityList}
          renderItem={({item}) => <City cityName={item} onSelect={() => onCitySelect(item)}/>}
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
