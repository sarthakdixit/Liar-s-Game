import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import style from "../App.module.css";
import ActionBoxButton from './buttons/ActionBoxButton';

const ActionBox = ({handleChallengeButton, toggleBetModal}) => {
  return (
    <View style={style.action_box}>
      <View style={style.action_box_inner}>
        <ActionBoxButton text="Challenge" onPressFunction={handleChallengeButton} />
      </View>
      <View style={style.action_box_inner}>
      <ActionBoxButton text="Place Bet" onPressFunction={toggleBetModal} />
      </View>
    </View>
  )
}

export default ActionBox

const styles = StyleSheet.create({})