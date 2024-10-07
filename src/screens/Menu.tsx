import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Icons} from '../assets';
import SearchBox from '../components/SearchBox';
import Modals from '../components/Modals';
import Data from '../utils/Data.json'
const SCREEN_HEIGHT = Dimensions.get('screen').height;

interface MenuProps {
  navigation: any;
}

const Menu = ({navigation}) => {
  const [modal, setmodal] = useState(false);

  const togglemodal = () => {
    setmodal(!modal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.messageview}>
          <View style={styles.headertext}>
            <Text style={{fontSize: 18, color: 'white'}}>Message</Text>
            <Text style={{fontSize: 13, color: 'white'}}>{Data.length} contacts</Text>
          </View>
          <Image source={Icons.bell} style={styles.bellimage} />
        </View>
      </View>
      <SearchBox />
      <View style={styles.newchat}>
        {/* <Text>Start a new chat</Text> */}
        <Image source={Icons.chat1} style={styles.chaticon} />
        <Text style={styles.nochattext}>No chats yet!</Text>
        <TouchableOpacity style={styles.touchablestartchattext} onPress={togglemodal}>
          <Text style={styles.startchattext}>Start Chat</Text>
        </TouchableOpacity>
        <Modals
          visible={modal}
          onclose={togglemodal}
          newchat={() => {
            navigation?.navigate('Search');
            setmodal(false);
          }}
        />
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  header: {
    height : SCREEN_HEIGHT * .15,
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
  chaticon :{
    alignSelf : 'center',
    height : 100,
    width : 100,
  },
  headertext: {},
  newchat: {
    alignSelf: 'center',
    top: SCREEN_HEIGHT * 0.25,
    justifyContent: 'center',
  },
  bellimage: {height: '55%', width: '10%'},
  nochattext:{
    fontWeight : '800',
    alignSelf : 'center'
  },
  startchattext:{
    color : 'white',
  },
  touchablestartchattext:{padding : 5,
    marginTop : 5,
    backgroundColor : '#2c7bbb',
    alignItems : 'center',
  

  },
});
