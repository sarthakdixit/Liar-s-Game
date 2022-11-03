import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import DropDownImage from "../assets/dropdown.png";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DropDown = ({onClick, selectedValue, choice}) => {

  return (
    <TouchableOpacity style={styles.dropdown} activeOpacity={0.8} onPress={() => onClick(choice)}>
            <Text>{!!selectedValue ? selectedValue : 'Choose'}</Text>
            <Image source={DropDownImage} />
    </TouchableOpacity>
  )
}

export default DropDown

const styles = StyleSheet.create({
    dropdown:{
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: windowWidth*0.04,
        paddingVertical: windowHeight*0.01,
        borderRadius: windowHeight*0.01,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    scrollview:{
        backgroundColor:'red',
        maxHeight:windowHeight*0.3
    }
})