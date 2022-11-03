import { StyleSheet, Text, Dimensions, TouchableOpacity, View } from 'react-native'
import React from 'react'
import style from "../../App.module.css";
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreenButton = ({text, id}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={[style.home_button, styles.button_dimensions]} onPress={() => {
      navigation.navigate("GameScreen", {
        id:id
      });
    }}>
      <Text style={[style.home_button_text, styles.button_text_dimensions]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default HomeScreenButton

const styles = StyleSheet.create({
    button_dimensions:{
        marginTop: windowHeight*0.02,
        paddingVertical: windowHeight*0.02,
        paddingHorizontal: windowWidth*0.02,
        borderRadius : windowWidth*0.02
      },
      button_text_dimensions:{
        fontSize: windowHeight*0.02
      }
})