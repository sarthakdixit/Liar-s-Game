import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import style from "../../App.module.css";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ActionBoxButton = ({text, onPressFunction}) => {
  return (
    <TouchableOpacity style={[style.action_btn, styles.action_btn]} onPress={onPressFunction}>
        <Text style={[style.action_btn_text, styles.action_btn_text]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ActionBoxButton

const styles = StyleSheet.create({
    action_btn:{
        paddingHorizontal: windowWidth*0.025,
        paddingVertical: windowHeight*0.01,
        borderRadius: windowHeight*0.01
    },
    action_btn_text:{
        fontSize: windowWidth*0.04
    }
})