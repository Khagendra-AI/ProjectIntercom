import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icons} from '../assets';
import SearchBox from '../components/SearchBox';
import Modals from '../components/Modals';
import Data from '../utils/Data.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

interface MenuProps {
  navigation: any;
}

const Menu = ({navigation}) => {
  const [modal, setmodal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const togglemodal = () => {
    setmodal(!modal);
  };

  useEffect(() => {
    const fetchData = async () => {
      const getContact = await AsyncStorage.getAllKeys();
      const userIds = getContact
        .map(key => key.split('_')[1]) // Split keys to get user ID
        .filter(id => id !== undefined);

      
      const filteredUsersData = Data.filter(user => userIds.includes(user.id.toString()));
      setFilteredUsers(filteredUsersData);
      console.log(filteredUsersData);
    };
    fetchData();
  });
  const renderItem = ({item, index}: {item: any; index: number}) => (
    <TouchableOpacity
      style={styles.flatcontainer}
      onPress={() => {
        navigation.navigate('Chat', {item: item});
      }}>
      <View style={[styles.avatar, {backgroundColor: `${item.color}`}]}>
        <Text>{item.profileImage}</Text>
      </View>
      <View style={styles.flatsubcontainer}>
        <Text style={styles.nametext}>{item.name}</Text>
        <Text style={styles.msgtext}>You: Hi</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.messageview}>
          <View style={styles.headertext}>
            <Text style={{fontSize: 18, color: 'white'}}>Message</Text>
            <Text style={{fontSize: 13, color: 'white'}}>
              {Data.length} contacts
            </Text>
          </View>
          <TouchableOpacity onPress={togglemodal} style={styles.touchablebell}>
          <Image source={Icons.add} style={styles.bellimage} />
          </TouchableOpacity>
        </View>
      </View>
      <SearchBox />
      { filteredUsers.length===0?
      <View style={styles.newchat}>
        {/* <Text>Start a new chat</Text> */}
        <Image source={Icons.chat1} style={styles.chaticon} />
        <Text style={styles.nochattext}>No chats yet!</Text>
        <TouchableOpacity
          style={styles.touchablestartchattext}
          onPress={togglemodal}>
          <Text style={styles.startchattext}>Start Chat</Text>
        </TouchableOpacity>
      </View>
      :
      <View>
       <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>
      
    }
      <Modals
          visible={modal}
          onclose={togglemodal}
          newchat={() => {
            navigation?.navigate('Search');
            setmodal(false);
          }}
        />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  header: {
    height: SCREEN_HEIGHT * 0.15,
    //flex: 0.20,
    backgroundColor: '#2a7bbb',
    flexDirection: 'row',
  },
  container: {flex: 1, backgroundColor: '#e7edf3'},
  messageview: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: '5%',
  },
  chaticon: {
    alignSelf: 'center',
    height: 100,
    width: 100,
  },
  headertext: {},
  newchat: {
    alignSelf: 'center',
    top: SCREEN_HEIGHT * 0.25,
    justifyContent: 'center',
  },
  // touchablebell:{backgroundColor : 'red'},
  bellimage: {height:30, width: 30},
  nochattext: {
    fontWeight: '800',
    alignSelf: 'center',
  },
  startchattext: {
    color: 'white',
  },
  touchablestartchattext: {
    padding: 5,
    marginTop: 5,
    backgroundColor: '#2c7bbb',
    alignItems: 'center',
  },
  flatcontainer: {
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: '4%',
    padding: '5%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: '2%',
  },
  avatar: {
    padding: '5%',
    borderRadius: 100,
  },
  flatsubcontainer: {
    marginHorizontal: '5%',
  },
  nametext: {fontSize: 18, fontWeight: '500'},
  msgtext: {
    color: '#B8B8B8',
    marginTop: '5%',
    fontSize: 15,
  },
});
