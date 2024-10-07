import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Icons} from '../assets';

interface ModalsProps {
  visible: boolean;
  onclose: () => void;
  newchat :()=>void;
}

const Modals = (props: ModalsProps) => {
  return (
    <Modal visible={props.visible} transparent={true} animationType="slide">
      <Pressable style={styles.modalContainer} onPress={props.onclose}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.newchatview} onPress={props.newchat}>
            <Image style={styles.chaticon} source={Icons.chat} />
            <Text style={styles.newchat}>New Chat</Text>
          </TouchableOpacity>
          <View style={styles.horline} />
          <TouchableOpacity style={styles.newchatview}>
            <Image style={styles.groupicon} source={Icons.groupchat} />
            <Text style={styles.newchat}>New Group Chat</Text>
          </TouchableOpacity>
          <View style={styles.horline} />
          <TouchableOpacity style={styles.newchatview}>
            <Image style={styles.announicon} source={Icons.announ} />
            <Text style={styles.newchat}>New Announcement</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default Modals;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '30%',
    backgroundColor: 'white',
    width: '100%',
    padding: '4%',
  },
  groupicon: {height: 30, width: 30},
  announicon: {height: 30, width: 30},
  newchatview: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: '1%',
    alignItems: 'center',
    borderRadius: 16,
    justifyContent: 'flex-start',
    marginVertical: '1%',
  },
  newchat: {fontSize: 15, marginHorizontal: '5%'},
  chaticon: {height: 30, width: 30},
  horline: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: '#E8E8E8',
    marginVertical: '3%',
  },
});
