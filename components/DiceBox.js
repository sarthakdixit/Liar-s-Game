import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import style from "../App.module.css";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DiceBox = ({dice_number, hidden}) => {
  return (
    <View style={style.dice_box}>
        <View style={[styles.dice_box_inner, style.dice_box_inner]}>
            {hidden ? <Text style={styles.text}>H</Text> : <Text style={styles.text}>{dice_number}</Text>}
        </View>
    </View>
  )
}

export default DiceBox

const styles = StyleSheet.create({
    text:{
        fontSize: windowHeight*0.03
    },
    dice_box_inner:{
        width: windowWidth*0.15,
        height: windowWidth*0.15,
        borderRadius: windowHeight*0.02
    }
})