import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {searchbarStyle} from '../styles';

const SearchBar = (props) => {
  return (
    <View style={searchbarStyle.container}>
      <Icon name="magnify" size={20} color="gray"/>
      <TextInput 
        placeholder="Search a city..."
        style={searchbarStyle.input}
      />
    </View>
  );
};

export {SearchBar};
