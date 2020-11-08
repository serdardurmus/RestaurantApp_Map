import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {searchbarStyle} from '../styles';

const SearchBar = (props) => {
  return (
    <View style={searchbarStyle.container}>
      <Icon name="magnify" size={18} color="gray"/>
      <TextInput 
        placeholder="Search a city..."
        style={searchbarStyle.input}

        // her harf girdiğimde searchbar nereden çağırırsam çağırayım, onun onSearch attiribute'unu tetikliyorum demektir
        onChangeText={value => props.onSearch(value)}
      />
    </View>
  );
};

export {SearchBar};
