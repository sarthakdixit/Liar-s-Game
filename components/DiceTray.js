import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import style from "../App.module.css";
import DiceBox from './DiceBox';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DiceTray = ({dice_array, hidden}) => {
  return (
    <View style={[style.dice_tray, styles.dice_tray]}>
        {dice_array.map((item, key) => (
            <DiceBox key={key} dice_number={item} hidden={hidden} />
        ))}
    </View>
  )
}

export default DiceTray

const styles = StyleSheet.create({
    dice_tray : {
        paddingHorizontal: windowWidth*0.02,
        paddingVertical: windowHeight*0.01
    }
})