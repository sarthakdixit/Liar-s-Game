import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import style from "../App.module.css";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BetBox = ({gameData, opponentGameData,bet, setBet}) => {
  
  useEffect(() => {
    if("bets" in gameData && gameData.bets.length > 0 && !("bets" in opponentGameData)){
      let elm = gameData.bets[gameData.bets.length-1];
      setBet(elm);
    }else if(!("bets" in gameData) && "bets" in opponentGameData  && opponentGameData.bets.length > 0){
      let elm = opponentGameData.bets[opponentGameData.bets.length-1];
      setBet(elm);
    }else if("bets" in gameData && "bets" in opponentGameData){
      if(gameData.bets.length > opponentGameData.bets.length){
        let elm = gameData.bets[gameData.bets.length-1];
        setBet(elm);
      }else if(gameData.bets.length < opponentGameData.bets.length){
        let elm = opponentGameData.bets[opponentGameData.bets.length-1];
        setBet(elm);
      }else{
        let elm1 = gameData.bets[gameData.bets.length-1];
        let elm2 = opponentGameData.bets[opponentGameData.bets.length-1];
        let datetime1 = elm1.datetime;
        let datetime2 = elm2.datetime;
        if((new Date(datetime1)) > (new Date(datetime2))){
          setBet(elm1);
        }else{
          setBet(elm2);
        }
      }
    }
  }, [gameData, opponentGameData])

  return (
    <View style={style.bet_box}>
      <Text style={[style.bet_box_text, styles.bet_box_text]}>Current Bet</Text>

      <View style={style.bet_box_outer}>
        <View style={style.bet_box_inner}>
            <Text style={[style.bet_box_text, styles.bet_box_text]}>Amount</Text>
            <Text style={[style.bet_box_text, styles.bet_box_text]}>{!!bet.amount ? bet.amount : 0}</Text>
        </View>
        <View style={style.bet_box_inner}>
            <Text style={[style.bet_box_text, styles.bet_box_text]}>Number</Text>
            <Text style={[style.bet_box_text, styles.bet_box_text]}>{!!bet.number ? bet.number : 0}</Text>
        </View>
      </View>
    </View>
  )
}

export default BetBox

const styles = StyleSheet.create({
    bet_box_text:{
        fontSize: windowWidth*0.04
    }
})