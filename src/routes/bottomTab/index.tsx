import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
 
import home from '../../screens/Home';
import account from '../../screens/Account';
import menu from '../../screens/Menu';
import favourite from '../../screens/Favourite';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Icons } from '../../assets';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
       <Tab.Screen
        component={home}
        name={'Home'}
        options={{
          headerShown: false,
            tabBarIcon: () => {
              return <Image source={Icons.home} style={styles.img} />;
            },
        }}
      />

      <Tab.Screen
        component={account}
        name={'Account'}
        options={{
          headerShown: false,
            tabBarIcon: () => {
              return <Image source={Icons.account} style={styles.img} />;
            },
        }}
      />

      <Tab.Screen
        component={favourite}
        name={'Favourite'}
        options={{
          headerShown: false,
            tabBarIcon: () => {
              return <Image source={Icons.favourite} style={styles.img} />;
            },
        }}
      />

      <Tab.Screen
        component={menu}
        name={'Menu'}
        options={{
          headerShown: false,
            tabBarIcon: () => {
              return <Image source={Icons.menu} style={styles.img} />;
            },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  img: {
    height: 20,
    width: 20,
  },
});
