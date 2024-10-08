import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Icons} from '../assets';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const randomColor = require('randomcolor');
const color = randomColor();
const Chat = ({navigation}: {navigation: any}) => {
  const [messages, setMessages] = React.useState<IMessage>();
  const [MModal, setMModal] = React.useState(false);
  const [OModal, setOModal] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [deleteModal, setdeleteModal] = React.useState(false);
  const route = useRoute();
  const item = route?.params;
  const chatId = route.params?.item.id;
  const [toggle, setToggle] = useState(false);

  React.useEffect(() => {
    const LoadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
      if (storedMessages) {
        const parsedMesssage = JSON.parse(storedMessages);
        // console.log(parsedMesssage, ']]]]]]]');

        setMessages(parsedMesssage);
        // console.log(messages, '..............');
      } else {
        const initialMessage = [
          {
            _id: 1,
            text: 'Hello Dev',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
            },
          },
        ];
        setMessages(initialMessage);
        // console.log(messages, '[[[[[[[[[[');
      }
    };
    LoadMessages();
  }, [chatId, toggle]);

  const onSend = React.useCallback((newMessages = []) => {
    setMessages(previousMessages => {
      const updatedMessage = GiftedChat.append(previousMessages, newMessages);
      AsyncStorage.setItem(
        `messages_${chatId}`,
        JSON.stringify(updatedMessage),
      );
      return updatedMessage;
    });
  }, []);

  // const handleSend = () => {
  //   if (inputText.trim().length > 0) {
  //     const newMsg: Item = {
  //       _id: messageIdCounter.current,
  //       text: inputText.trim(),
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'User',

  //       },
  //     };
  //     setMsgs(previousMsgs => GiftedChat.append(previousMsgs, [newMsg]));
  //     setInputText('');
  //     messageIdCounter.current += 1;
  //   }
  // };
  const toggleMModal = () => {
    setMModal(!MModal);
  };
  const textInput = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            })
              .then(image => {
                // Create a new message for the image
                const newMsg = {
                  _id: messages.length + 1, // Incremental ID for demo purposes
                  text: '',
                  createdAt: new Date(),
                  user: {
                    _id: 1,
                    name: 'User',
                  },
                  image: image.path,
                };
                onSend([newMsg]);
              })
              .catch(error => {
                Alert.alert(JSON.stringify(error));
              });
          }}>
          <Image source={Icons.add} style={styles.backIcon} />
        </TouchableOpacity>
        <TextInput
          onSubmitEditing={() => {
            if (inputText.trim().length > 0) {
              const newMsg = {
                _id: messages.length + 1,
                text: inputText.trim(),
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: 'User',
                },
              };
              onSend([newMsg]);
              setInputText('');
            }
          }}
          placeholder="Type message.."
          style={styles.textInputStyle}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          onPress={() => {
            if (inputText.trim().length > 0) {
              const newMsg = {
                _id: messages.length + 1,
                text: inputText.trim(),
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: 'User',
                },
              };
              onSend([newMsg]);
              setInputText('');
            }
          }}>
          <Image source={Icons.send} style={styles.sendButton} />
        </TouchableOpacity>
      </View>
    );
  };
  const toggleOptionModal = () => {
    setOModal(!OModal);
  };

  return (
    // <View>{/* <Text>{JSON.stringify(item)}</Text> */}</View>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.insideheader}>
          <TouchableOpacity
            style={styles.touchableback}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={Icons.back} style={styles.back} />
          </TouchableOpacity>
          <View style={styles.headerdata}>
            <View
              style={[
                styles.avatar,
                {backgroundColor: `${route.params.item.color}`},
              ]}>
              <Text>{route.params.item.profileImage}</Text>
            </View>
            <View style={styles.headertext}>
              <Text style={styles.nametext}>{route.params.item.name}</Text>
              <Text style={styles.infotext}>Clocked in</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={toggleOptionModal}
            style={styles.touchablethreedotsicon}>
            <Image source={Icons.threedots} style={styles.threedotsicon} />
          </TouchableOpacity>
        </View>
      </View>

      <GiftedChat
        loadEarlier={true}
        messagesContainerStyle={{backgroundColor: '#e7edf3'}}
        onLongPress={toggleMModal}
        messages={messages}
        renderInputToolbar={textInput}
        alignTop={true}
        onSend={messages => onSend(messages as [])}
        user={{
          _id: 1,
        }}
      />
      <Modal visible={MModal} transparent={true} animationType="slide">
        <Pressable style={styles.modalContainer} onPress={toggleMModal}>
          <View style={styles.modalContent}>
            <View style={styles.emojiView}>
              <TouchableOpacity>
                <Image source={Icons.like} style={styles.emoji} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={Icons.heart} style={styles.emoji} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={Icons.smile} style={styles.emoji} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={Icons.celeb} style={styles.emoji} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={Icons.dislike} style={styles.emoji} />
              </TouchableOpacity>
            </View>
            <View style={styles.horline} />
            <TouchableOpacity style={styles.modalSubContent}>
              <Image source={Icons.reply} style={styles.MModalIcon} />
              <Text style={styles.MModalText}>Reply</Text>
            </TouchableOpacity>
            <View style={styles.horline} />
            <TouchableOpacity style={styles.modalSubContent}>
              <Image source={Icons.forward} style={styles.MModalIcon} />
              <Text style={styles.MModalText}>Forward</Text>
            </TouchableOpacity>
            <View style={styles.horline} />
            <TouchableOpacity style={styles.modalSubContent}>
              <Image source={Icons.copy} style={styles.MModalIcon} />
              <Text style={styles.MModalText}>Copy</Text>
            </TouchableOpacity>
            <View style={styles.horline} />
            <TouchableOpacity style={styles.modalSubContent}>
              <Image source={Icons.star} style={styles.MModalIcon} />
              <Text style={styles.MModalText}>Star</Text>
            </TouchableOpacity>
            <View style={styles.horline} />
            <TouchableOpacity style={styles.modalSubContent}>
              <Image source={Icons.report} style={styles.MModalIcon} />
              <Text style={styles.MModalText}>Report</Text>
            </TouchableOpacity>
            <View style={styles.horline} />
            <TouchableOpacity
              style={styles.modalSubContent}
              onPress={() => {
                setdeleteModal(true), setMModal(false);
              }}>
              <Image source={Icons.delete} style={styles.MModalIcon} />
              <Text style={[styles.MModalText, {color: 'red'}]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      <Modal visible={OModal} transparent={true} animationType="slide">
        <Pressable style={styles.OmodalContainer} onPress={toggleOptionModal}>
          <View style={styles.OmodalContent}>
            <TouchableOpacity style={styles.modalSubContent}>
              <Image style={styles.MModalIcon} source={Icons.eye} />
              <Text style={styles.MModalText}>View Details</Text>
            </TouchableOpacity>
            <View style={styles.horline} />
            <TouchableOpacity style={styles.modalSubContent}>
              <Image style={styles.MModalIcon} source={Icons.pin} />
              <Text style={styles.MModalText}>Pin Chat</Text>
            </TouchableOpacity>
            <View style={styles.horline} />
            <TouchableOpacity style={styles.modalSubContent}>
              <Image style={styles.MModalIcon} source={Icons.search} />
              <Text style={styles.MModalText}>Search Chat</Text>
            </TouchableOpacity>
            <View style={styles.horline} />
            <TouchableOpacity style={styles.modalSubContent}>
              <Image style={styles.MModalIcon} source={Icons.delete} />
              <Text style={[styles.MModalText, {color: 'red'}]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      <Modal
        transparent={true}
        visible={deleteModal}
        animationType="fade"
        onRequestClose={() => setdeleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer1}>
            <View style={styles.deleteiconview}>
              <Image source={Icons.delete} style={styles.emoji} />
            </View>
            <Text style={styles.accountText}>Delete Message?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this message?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.primaryCont1}
                onPress={() => setdeleteModal(false)}>
                <Text style={styles.primary1}>No,Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryCont}
                onPress={() => {
                  setdeleteModal(false);
                }}>
                <Text style={styles.primary}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7edf3',
    // groundColor: '#e7edf3',
  },
  header: {
    borderRadius: 18,
    flex: 0.19,
    backgroundColor: 'white',
  },
  insideheader: {
    // backgroundColor : 'grey',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: SCREEN_HEIGHT * 0.095,
  },
  headerdata: {
    width: '60%',
    flexDirection: 'row',
    // backgroundColor :'red',
    alignItems: 'center',
  },
  headertext: {marginHorizontal: '4%'},
  avatar: {
    padding: '5%',
    borderRadius: 100,
  },
  touchableback: {
    marginLeft: '3%',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: '3%',
    padding: 5,
    backgroundColor: '#F0F0F0',
  },
  back: {},
  nametext: {fontSize: 17},
  infotext: {color: '#989898'},
  touchablethreedotsicon: {
    padding: '2%',
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginRight: '3%',
  },
  threedotsicon: {height: 25, width: 25},
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  OmodalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: '5%',
    height: '45%',
    backgroundColor: 'white',
  },
  OmodalContent: {
    padding: '5%',
    height: '25%',
    backgroundColor: 'white',
  },
  modalSubContent: {
    //backgroundColor :'red',
    alignItems: 'center',
    flexDirection: 'row',
  },
  horline: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: '#E8E8E8',
    marginVertical: '2.57%',
  },
  MModalIcon: {
    height: 20,
    width: 20,
  },
  MModalText: {
    marginHorizontal: '4%',
  },
  emojiView: {flexDirection: 'row', justifyContent: 'space-between'},
  emoji: {
    height: 35,
    width: 35,
  },
  sendButton: {
    height: 25,
    width: 25,
    transform: [{rotate: '-35deg'}],
    alignSelf: 'center',
  },

  textInputStyle: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    // borderWidth:1,
    height: 40,
    width: '75%',
    marginRight: 10,
    marginLeft: 20,
    alignSelf: 'flex-end',
  },
  backIcon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    marginTop: 5,
  },
  footer: {
    marginBottom: SCREEN_HEIGHT *.03,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer1: {
    width: 346,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 60,
  },
  accountText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: 'blue',
  },
  modalText: {
    // color: colors.modalText,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 6,
    marginBottom: 28,
  },
  primaryCont: {
    backgroundColor: 'blue',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryCont1: {
    backgroundColor: 'lightgray',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primary: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  primary1: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteiconview: {
    backgroundColor: 'orange',
    borderRadius: 80,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
