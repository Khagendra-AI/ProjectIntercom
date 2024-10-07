import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Icons, Images} from '../assets';
import Data from '../utils/Data.json';

const randomColor = require('randomcolor'); // import the script
const color = randomColor();

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const Search = ({navigation}: {navigation: any}) => {
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

  //   const spelling = 'khagendra';
  //   console.log(
  //     spelling?.includes('k'),
  //     'includes',
  //     Data?.filter(item => item?.name?.includes('Mia')),
  //   );
  const [fdata, setfdata] = useState(Data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.touchableback}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.back} source={Icons.back} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchbox}
          onChangeText={(text: string) => {
            const rdata = Data?.filter((item, index) =>
              item?.name?.includes(text),
            );
            setfdata(rdata);
            //console.log('onchangetext', fdata);
          }}
          placeholder="Search Here.."
        />
      </View>
      {fdata.length>0 ?(

      <FlatList
        data={fdata}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      ):(
        <View style={styles.noresultview}>

        <Image
        source={Images.noresult}
        style={styles.noresultimage}
        />
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    //padding: '2%',
    flex: 1,
    backgroundColor: '#e7edf3',
  },
  header: {
    marginVertical :5,
    flexDirection: 'row',
    marginTop: SCREEN_HEIGHT * 0.065,
    justifyContent: 'space-between',
    marginHorizontal: '2%',
  },
  touchableback: {
    marginLeft: '2%',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: '3%',
    padding: 5,
    backgroundColor: 'white',
  },
  back: {},
  searchbox: {
    backgroundColor: 'white',
    marginHorizontal: '2%',
    flex: 1,
    borderRadius: 8,
    //borderWidth :1,
    padding: 14,
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
  noresultview:{
    flex:1,
    justifyContent:'center',
    alignItems : 'center',
    
  },
  noresultimage:{
    height : 166,
    width:269,
    resizeMode : 'contain',
  },
});
