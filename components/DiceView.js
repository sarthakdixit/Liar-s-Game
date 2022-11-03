import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react';
import style from "../App.module.css";
import DiceTray from './DiceTray';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DiceView = ({data, text, hidden}) => {
  return (
    <View style={style.dice_view}>
        <Text style={[style.dice_view_text, styles.dice_view_text]}>{text}</Text>
        <DiceTray dice_array={data.diceValue} hidden={hidden} />
    </View>
  )
}

export default DiceView

const styles = StyleSheet.create({
    dice_view_text:{
        fontSize: windowHeight*0.025
    }
})