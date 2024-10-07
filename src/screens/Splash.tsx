import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import { Images } from '../assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      
        navigation.replace('Bottom');
      
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={Images.splashh}
        style={styles.splashimage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    color: '#98c6e3',
    marginBottom: 20,
  },
  splashimage: {
    resizeMode: 'cover',
    height: '110%',
    width: '110%',
  },
  indicator: {position: 'absolute'},
});

export default Splash;
