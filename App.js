import { StatusBar } from 'expo-status-bar';
import "./config/firebase";
import { Button, StyleSheet, Text, View } from 'react-native';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useEffect } from 'react';
import BasicStack from './navigation/BasicStack';

export default function App() {

  // useEffect(() => {
  //   setupHighscoreListener();
  // }, [])

  const storeHighScore = () => {
    let userId = 1;
    let score = 10;
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    set(reference, {
      highscore: score,
    });
  }

  const setupHighscoreListener = () => {
    let userId = 1;
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    onValue(reference, (snapshot) => {
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
  }

  return (
    <BasicStack />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
