import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import style from "../App.module.css";
import BetModalSelect from './BetModalSelect';
import DropDown from './DropDown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BetModalBox = ({gameData, opponentGameData, onBetSubmit, bet, setBet}) => {
  const [openOption, setOpenOption] = useState(false);
  const [title, setTitle] = useState("");
  const [minNumber, setMinNumber] = useState(1);

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
      }
    }
  }, [])

  const toggleOpenOption = (chooseTitle) => {
    if(chooseTitle == "Number"){
      if(bet.amount != null){
        setMinNumber(bet.number);
      }
    }else{
      if(bet.number != null){
        setMinNumber(bet.amount);
      }
    }
    setTitle(chooseTitle);
    setOpenOption(prev => !prev);
  }

  const onSelectAmount = (item) => {
    setBet(prev => {
      return {...prev, amount:item}
    });
  }

  const onSelectNumber = (item) => {
    setBet(prev => {
      return {...prev, number:item}
    });
  }

  return (
    <View style={style.bet_modal_box}>
      {openOption ? <BetModalSelect choice={title} backOnClick={toggleOpenOption} onSelectAmount={onSelectAmount} onSelectNumber={onSelectNumber} number={minNumber}/> : <><View style={[style.bet_modal_outer, styles.bet_modal_outer]}>
        <View style={style.bet_modal_inner}>
            <Text style={[styles.bet_modal_text, style.bet_modal_text]}>Amount</Text>
            <DropDown selectedValue={bet.amount} onClick={toggleOpenOption} choice="Amount" />
        </View>
        <View style={style.bet_modal_inner}>
            <Text style={[styles.bet_modal_text, style.bet_modal_text]}>Number</Text>
            <DropDown selectedValue={bet.number}  onClick={toggleOpenOption} choice="Number" />
        </View>
      </View>
      <TouchableOpacity style={[styles.bet_btn, style.bet_btn]} onPress={() => onBetSubmit(bet)}>
          <Text style={[style.bet_modal_text, styles.bet_modal_text, styles.bet_btn_text]}>Bet</Text>
      </TouchableOpacity></>}
    </View>
  )
}

export default BetModalBox

const styles = StyleSheet.create({
    bet_modal_text:{
        fontSize: windowWidth*0.05
    },
    bet_btn:{
      width:windowWidth*0.3,
      height:windowHeight*0.07,
      borderRadius: windowWidth*0.03,
      marginTop:windowHeight*0.1
    },
    bet_btn_text:{
      color:'white',
      fontSize:windowWidth*0.04
    }
})