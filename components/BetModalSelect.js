import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import DropDown from './DropDown';
import style from "../App.module.css";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BetModalSelect = ({choice, number, backOnClick, onSelectAmount, onSelectNumber}) => {
    const[data, setData] = useState([]);

    useEffect(() => {
        let maxNumber = 0;
        if(choice === "Number"){
            maxNumber = 6;
        }else{
            maxNumber = 10;
        }
        let arr = [];
        for(let i=number;i<=maxNumber;i++){
            arr.push(i);
        }
        setData(arr);
    }, [])

    const onClick = (element) => {
        if(choice === "Number"){
            onSelectNumber(element);
        }else{
            onSelectAmount(element);
        }
        backOnClick();
    }

  return (
    <View style={style.bet_modal_select_container}>
        <Text style={[styles.bet_modal_text, style.bet_modal_text]}>{choice}</Text>

        {data.length == 0 ? null : <ScrollView style={styles.scroll_view}>
            {data.map((item, key) => <TouchableOpacity key={key} style={[style.scrollview, styles.scrollview]} onPress={() => onClick(item)}>
                <Text>{item}</Text>
            </TouchableOpacity>)}
        </ScrollView>}

        <TouchableOpacity style={[styles.back_btn, style.back_btn]} onPress={backOnClick}>
            <Text style={styles.back_btn_text}>Back</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BetModalSelect

const styles = StyleSheet.create({
    bet_modal_text:{
        fontSize: windowWidth*0.05
    },
    scroll_view:{
        width:windowWidth*0.5,
        maxHeight:windowHeight*0.3
    },
    back_btn:{
        width:windowWidth*0.3,
        height:windowHeight*0.07,
        borderRadius: windowWidth*0.03,
        marginTop:windowHeight*0.05
    },
    back_btn_text:{
        color:'white',
        fontSize:windowWidth*0.04
    },
    scrollview:{
        paddingVertical:windowHeight*0.01,
        marginBottom:windowHeight*0.001,
        borderRadius:windowHeight*0.01
    }
})