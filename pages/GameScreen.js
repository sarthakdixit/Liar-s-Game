import { StyleSheet, Text, View, Modal, ImageBackground, Dimensions, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import JackSpparrowImage from "../assets/jack-spparrow.jpg";
import DavyJonesImage from "../assets/davy-jones.jpg";
import style from "../App.module.css";
import DiceTray from '../components/DiceTray';
import DiceView from '../components/DiceView';
import ActionBox from '../components/ActionBox';
import BetBox from '../components/BetBox';
import BetModalBox from '../components/BetModalBox';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GameScreen = ({route}) => {
  const navigation = useNavigation();
  const id = route.params.id;
  const opponentId = id === "jack_spparrow" ? "davy_jones" : "jack_spparrow";
  const [gameData, setGameData] = useState({
    diceValue:[],
    ready:false,
    turn : id === "jack_spparrow" ? true : false,
    bets : [],
    win : "none",
    challenge : false
  });
  const [opponentGameData, setOpponentGameData] = useState({});
  const [loading, setLoading] = useState(true);
  const [betModalVisible, setBetModalVisible] = useState(false);
  const [bet, setBet] = useState({
    amount : null,
    number : null
  });

  useEffect(() => {
    setupDataListener();
    setDiceValue();
    setLoading(false);

    return () => {
      setGameData(prev => {
        return {...prev,
        ready: false}
      })
    };
  }, [])

  useEffect(() => {
    storeData(gameData)
  }, [gameData])

  useEffect(() => {
    if(Object.keys(opponentGameData).length > 0){
      if(!opponentGameData.turn){
        setGameData(prev => {
          return {
            ...prev,
            turn : true
          }
        })
      }
    }
    if("challenge" in opponentGameData && opponentGameData.challenge){
      ToastAndroid.show("Bet is being challenged", ToastAndroid.SHORT);
    }

    if("win" in opponentGameData){
      if(opponentGameData.win === "true"){
      ToastAndroid.show("You Lost", ToastAndroid.SHORT);
      navigation.navigate("HomeScreen");
      }else if(opponentGameData.win === "false"){
        ToastAndroid.show("You Win", ToastAndroid.SHORT);
        navigation.navigate("HomeScreen");
      }
    }
  }, [opponentGameData])

  const onBetSubmit = (obj) => {
    if(obj.number != null && obj.amount != null){
      let arr = gameData.bets;
      arr.push({
        amount : obj.amount,
        number : obj.number,
        datetime : (new Date()).toUTCString()
      });
      setGameData(prev => {
        return {
          ...prev,
          bets:arr,
          turn : false
        }
      });
    }else{
      ToastAndroid.show("Choose values", ToastAndroid.SHORT);
    }
  }

  const setupDataListener = () => {
    let db = getDatabase();
    let reference = ref(db, `${opponentId}/`);
    onValue(reference, (snapshot) => {
      let object = snapshot.val();
      setOpponentGameData(object);
    });
  }

  const setDiceValue = () => {
    let arr = [];
    while(arr.length != 5){
      let randomNumber = getRandomInt(1, 7);
      arr.push(randomNumber);
    }
    setGameData(prev => {
      return {
        ...prev,
        diceValue:arr,
        ready:true
      }
    });
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const storeData = (object) => {
    let db = getDatabase();
    let reference = ref(db, `${id}/`);
    set(reference, object);
  }

  const toggleBetModal = () => {
    setBetModalVisible(prev => !prev)
  }

  const handleChallengeButton = () => {
    if(("bets" in opponentGameData) && ("bets" in gameData) && gameData.bets.length != 0 && opponentGameData.bets.length != 0){
      let countObj = [0, 0, 0, 0, 0, 0];
      for(let i=0;i<gameData.diceValue;i++){
        let value = gameData[i];
        let sum = countObj[value-1];
        countObj[value-1] = sum + 1;
        value = opponentGameData[i];
        sum = countObj[value-1];
        countObj[value-1] = sum + 1;
      }
      let value = countObj[bet.number-1];
      if(value >= bet.amount){
        ToastAndroid.show("You Win", ToastAndroid.SHORT);
        setGameData(prev => {
          return {
            ...prev,
            win : "true"
          }
        });
        navigation.navigate("HomeScreen");
      }else{
        ToastAndroid.show("You Loose", ToastAndroid.SHORT);
        setGameData(prev => {
          return {
            ...prev,
            win : "false"
          }
        });
        navigation.navigate("HomeScreen");
      }
    }else{
      ToastAndroid.show("This is first bet of the game", ToastAndroid.SHORT);
    }
  }

  return (
    <View>
      <ImageBackground source={id === "jack_spparrow" ? JackSpparrowImage : DavyJonesImage} style={[style.background_img, styles.background_img]} resizeMode="cover">
        {Object.keys(gameData).length != 0 && Object.keys(opponentGameData).length != 0 && gameData.ready && opponentGameData.ready ?
        <>
        <View style={[style.other_dice_view, styles.other_dice_view]}>
          <DiceView data={opponentGameData} text="Opponent Dice" hidden={true} />
        </View>

        <View style={[styles.turn_view, style.turn_view]}>
          {gameData.turn ? <Text style={[styles.turn_view_text, style.turn_view_text]}>Your's Turn</Text> : <Text style={[styles.turn_view_text, style.turn_view_text]}>Opponent's Turn</Text>}
        </View>

        <View style={[styles.bet_view, style.bet_view]}>
          <BetBox gameData={gameData} opponentGameData={opponentGameData} bet={bet} setBet={setBet} />
        </View>

        {gameData.turn ? <View style={[style.action_view, styles.action_view]}>
          <ActionBox handleChallengeButton={handleChallengeButton} toggleBetModal={toggleBetModal} />
        </View> : null}

        <View style={[style.my_dice_view, styles.my_dice_view]}>
          <DiceView data={gameData} text="Your Dice" hidden={false} />
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={betModalVisible}
        onRequestClose={toggleBetModal}
      >
        <View style={[style.bet_centered_view, styles.bet_centered_view]}>
          <View style={[style.bet_modal_view, styles.bet_modal_view]}>
            <BetModalBox gameData={gameData} opponentGameData={opponentGameData} onBetSubmit={onBetSubmit} bet={bet} setBet={setBet} />
          </View>
        </View>
      </Modal>
        </> : null}
      </ImageBackground>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  background_img:{
    width: windowWidth,
    height: windowHeight*1.5
  },
  my_dice_view:{
    width: windowWidth,
    top:windowHeight*0.85
  },
  other_dice_view:{
    width: windowWidth,
    top:windowHeight*0.06
  },
  turn_view:{
    width: windowWidth,
    paddingVertical: windowHeight*0.01,
    paddingHorizontal: windowWidth*0.01,
    top: windowHeight*0.4
  },
  turn_view_text:{
    fontSize:windowHeight*0.02
  },
  action_view:{
    width: windowWidth,
    top: windowHeight*0.75
  },
  bet_view:{
    width: windowWidth,
    top: windowHeight*0.6
  },
  bet_centered_view:{
    marginTop: windowHeight*0.4
  },
  bet_modal_view:{
    borderTopLeftRadius: windowWidth*0.05,
    borderTopRightRadius: windowWidth*0.05,
    paddingVertical:windowHeight*0.05,
    paddingHorizontal:windowWidth*0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})
