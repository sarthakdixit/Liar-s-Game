import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import style from "../App.module.css";
import HomeScreenButton from '../components/buttons/HomeScreenButton';

const HomeScreen = () => {
  return (
    <View style={style.container}>
      <View style={style.home_sub_container}>
        <HomeScreenButton text="Jack Spparrow" id="jack_spparrow" />
        <HomeScreenButton text="Davy Jones" id="davy_jones" />
      </View>
    </View>
  )
}

export default HomeScreen