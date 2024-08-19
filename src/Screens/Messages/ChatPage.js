import { ActivityIndicator, Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ScreenLayout from '../../Components/ScreenLayout/ScreenLayout'
import { useRoute } from '@react-navigation/native';
import { AppTextInput, Icon } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';
import NavigationService from '../../Services/Navigation';
import DoubleTick from '../../assets/icons/DoubleTick';
import CameraIcon from '../../assets/icons/CameraIcon';
import MicroPhoneIcon from '../../assets/icons/MicroPhoneIcon';
import GalleryIcon from '../../assets/icons/GallaryIcon';
import EmojiIcon from '../../assets/icons/EmojiIcon';

import { useDispatch, useSelector } from 'react-redux';
import HelperFunctions from '../../Constants/HelperFunctions';
import { postApi } from '../../Services/Service';
import database from '@react-native-firebase/database';
import DocumentPicker from 'react-native-document-picker'
import ImageCropPicker from 'react-native-image-crop-picker';
import moment from 'moment-timezone';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const ChatPage = (props) => {
  const route = useRoute();
  // Access the customProp passed from the source screen
  const customProp = route.params?.showButton;
  const refv = useRef(null)
  const { booking_id, room_Id, hostData, slugType, propertyName, host_id, propertyImage } = props.route.params ?? ''
  const { login_status, userDetails, token } = useSelector(state => state.authData);
  const [IsFocused, setIsFocused] = useState(false)
  const [roomId, setRoomId] = useState(room_Id ?? null)
  const [email, setEmail] = useState('');
  const [loadingState, setloadingState] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [disabled, setdisabled] = useState(false);
  const [Loder, setLoader] = useState(false);
  const form = new FormData();
  const [imageload,setImageload] = useState(false)
  const [allChat, setallChat] = useState([


  ]);
  const [showScrollDown, setShowScrollDown] = useState(false)

  const dispatch = useDispatch();



  const getFirebaseListener = oldVal => {
    database()
      .ref(`/messages/${slugType}/${roomId}`)
      // .limitToLast(1)
      .on('child_added', snapshot => {
        if (snapshot.exists()) {

          console.log('sdiadityewwie', snapshot.val())
          let fbData = snapshot.val();
          let msgIndex = allChat.findIndex((item) => item.id == fbData.id);
          if (msgIndex == -1) {
            setallChat(msg => [fbData, ...msg]);
            const filteredUsers = Object.values(snapshot.val()).filter((userr, index) => userr.from != userDetails.id);
            if (filteredUsers.length > 0) {
              console.log('filteredUsers', filteredUsers)
              filteredUsers.forEach(async user => {
                try {

                  await database()
                    .ref(`/messages/${slugType}/${roomId}/${user.id}`)
                    .update({ readStatus: 'read' });

                  console.log(`User ${user.from} status updated successfully.`);
                } catch (error) {
                  console.error(`Error updating user ${user.from} status:`, error);
                }
              });
            }
          }

        }
      });
  };



  /* == Set room ID for new user == */
  const setChatRoomId = () => {
    if (message.trim().length == 0) {
      return;
    }
    let data = {
      "propertyReservationId": booking_id,
      "message": message
    }
    setdisabled(true);
    postApi("api/chat-initialise", data, token).then(response => {
      if (response?.status) {
        setRoomId(response?.Room_id)
        sendMsg(response?.Room_id)
      }
      else {
        // dispatch(setExtraUserDetails({"chat_room_id":}))
      }
      setloadingState(false)
    }).catch(error => {
      setloadingState(false)
      HelperFunctions.showToastMsg(error.message)
    })
  }


  function getOriginalname(data) {
    let arr = data.split("/");
    let lent = Number(arr.length - 1);
    return arr[lent];
  }
  const imageUpload = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.5,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 300
    }).then(image => {
      console.log('imaher', JSON.stringify(image))
      let get_originalname = getOriginalname(image.path);

      // form.append('image_for', 'profile_image');
      form.append('file', {
        uri: image.path,
        type: image.mime,
        name: get_originalname,
      });
      // setMessage(get_originalname)
      console.log('form', form)
      if (form != null && image) {
        createFileLink()
      }

    }).catch(error => { HelperFunctions.showToastMsg(error?.message) })
  }
  const imageUploadCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.5,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 300
    }).then(image => {
      console.log('imaher', JSON.stringify(image))
      let get_originalname = getOriginalname(image.path);

      // form.append('image_for', 'profile_image');
      form.append('file', {
        uri: image.path,
        type: image.mime,
        name: get_originalname,
      });
      // setMessage(get_originalname)
      console.log('form', form)
      if (form != null && image) {
        createFileLink()
      }

    }).catch(error => { HelperFunctions.showToastMsg(error?.message) })
  }

  const openFiles = () => {
    DocumentPicker.pickSingle({ type: [DocumentPicker.types.images] }).then(assets => {
      console.log('assets', assets)

      form.append('file', {
        uri: assets.uri,
        type: assets.type,
        name: assets.name,
      });
      // form.append('file_type','pdf')
      if (form != null && assets) {
        createFileLink()
      }
    }).catch(error => { HelperFunctions.showToastMsg(error?.message) })
  }


  const createFileLink = () => {
    setLoader(true)
    postApi("api/common-file-upload", form, token, 'multipart/form-data').then(response => {
      console.log('response', response)
      if (response?.status) {
        sendMsg(roomId, response.data)
        console.log('firssdfht', response.data)
        // HelperFunctions.showToastMsg(response?.message)



      } else {
        HelperFunctions.showToastMsg(response?.error ?? 'Failed')
        // setLoader(false)

      }
      setLoader(false)
    }).catch(error => {
      HelperFunctions.showToastMsg(error?.message)
      setLoader(false)
    }).finally(() => {
      setLoader(false)
    })


  }

  /*== Send Message == */
  const sendMsg = (roomid = roomId, ffle = "") => {
    if (message.trim().length == 0 && ffle == "") {
      return;
    }
    let msgData = {};
    console.log('filele', ffle)
   
    // const time = moment().format()
    // const localtz = moment.tz.guess() // user's timezone
    // const date = time.clone().tz(localtz)
    if (ffle != "") {
      msgData = {
        roomId: roomid,
        from: userDetails.id,
        name: userDetails.first_name + " " + userDetails.last_name,
        sendTime: new Date().getTime(),
        sendTimeUTC: database.ServerValue.TIMESTAMP,
        message: ffle?.filepath,
        fileExtension: ffle?.fileExtension,
        fileOriginalName: ffle?.fileOriginalName,
        msgType: "File",
        readStatus: "unread",

      }
    } else {
      msgData = {
        roomId: roomid,
        message: message,
        sendTime: new Date().getTime(),
        sendTimeUTC: database.ServerValue.TIMESTAMP,
        from: userDetails.id,
        name: userDetails.first_name + " " + userDetails.last_name,
        msgType: 'Text',
        readStatus: "unread",
      }
    }
    setMessage('')
    // form.append('file', null)
    console.log('msgData', msgData);
    const newReference = database()
      // .ref('/messages/' + receiverData.roomId)
      .ref('/messages/' + slugType + "/" + roomid)
      .push();
    msgData.id = newReference.key;

    newReference.set(msgData).then(() => {
      console.log('sucesssfullll')
      setallChat([msgData, ...allChat]);
      let receiepnts = { ['participants_' + userDetails.id]: userDetails.id, ['participants_' + host_id]: Number(host_id) };
      let users_name = { ['participants_' + userDetails.id]: userDetails.first_name + ' ' + userDetails.last_name, ['participants_' + host_id]: hostData.name };
      let chatListupdate = {};
      if (ffle != "") {
        chatListupdate = {
          lastMsg: ffle?.filepath,
          sendTime: msgData.sendTime,
          roomId: msgData.roomId,
          from: userDetails.id,
          msgType: "File",
          readStatus: "unread",
          name: userDetails.first_name+ ' ' + userDetails.last_name,
          receiepnts: receiepnts,
          users_name: users_name,
          image: propertyImage,
          slug: slugType,
          title:propertyName
        };
      } else {
        chatListupdate = {
          lastMsg: message,
          sendTime: msgData.sendTime,
          roomId: msgData.roomId,
          from: userDetails.id,
          msgType: "Text",
          readStatus: "unread",
          name: userDetails.first_name+ ' ' + userDetails.last_name,
          receiepnts: receiepnts,
          users_name: users_name,
          image: propertyImage,
          slug: slugType,
          title:propertyName
        };
      }
      database()
        .ref('/chat_history/' + roomid)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));

      let dataA = {};
      if (ffle != "") {
        dataA = {
          "sender_id": userDetails.id,
          "room_id": roomid,
          "message": ffle?.filepath,
          "type": "image"
        }
      } else {
        dataA = {
          "sender_id": userDetails.id,
          "room_id": roomid,
          "message": message,
          "type": "text"
        }
      }
      postApi("api/chat-store", dataA, token).then(response => {
        if (response?.status) {
          console.log('response>>>>>>>', response)
        }
        else {
          // dispatch(setExtraUserDetails({"chat_room_id":}))
        }
        setloadingState(false)
      }).catch(error => {
        setloadingState(false)
        HelperFunctions.showToastMsg(error.message)
      })
      setMessage('');
      setdisabled(false);
    });
  };

  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => {
      refv.current.blur()
      setIsFocused(false)
    }} key={index} style={{ marginVertical: 0, marginHorizontal: 0, width: width - 30 }}>

      <View
        style={[
          styles.TriangleShapeCSS,
          item.from == userDetails.id ? styles.right : [styles.left],
        ]}
      />
      <View style={[
        // styles.masBox,
        {
          alignSelf: item.from == userDetails.id ? 'flex-end' : 'flex-start',
          flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center',
          //   backgroundColor: item.from ==userDetails.id ? '#767680' : '#525252',
        },
      ]}>

        {/* {item.from != userDetails.id ?
          <Image
            source={{ uri: hostData?.avatar }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 30,
              marginLeft: 0,
            }}
            resizeMode='cover'
          />
          : null
        } */}

        <View
          style={[
            styles.masBox,
            {
              alignSelf: item.from == userDetails.id ? 'flex-end' : 'flex-start',
              backgroundColor: item.from != userDetails.id ? '#fff' : Theme.colors.secondary, marginTop: 6
              //   borderWidth:0.5,borderColor:'#EBEBEB'
            },
          ]}>

          <View style={{ padding: 5 }}>
            {item.from != userDetails.id ?
              <Text style={{ color: Theme.colors.primary, fontSize: 13, fontFamily: Theme.FontFamily.bold }}>{item.name}</Text> : <Text style={{ color: Theme.colors.white, fontSize: 13, fontFamily: Theme.FontFamily.bold }}>You</Text>}
            {item?.msgType == 'File' ?
            <View>
              <Image
                source={{ uri: item?.message }}
                // onLoadStart={()=>setImageload(true)}
                // onProgress={()=>setImageload(true)}
                // onLoadEnd={()=>setImageload(false)}
                style={{
                  width: width / 2.2,
                  height: 200,
                  borderRadius: 10,
                  marginLeft: 0, marginTop: 5
                }}
              />
              {imageload ? <ActivityIndicator size={20} color={'red'} style={{position:'absolute',top:0,right:0,left:0,bottom:0}}/> : null}
              </View>
               :
              <Text
                style={{
                  // paddingHorizontal: 5,
                  paddingTop: 3,
                  color: item.from != userDetails.id ? '#000' : '#fff',
                  fontSize: 13,
                  // letterSpacing:0.5
                }}>
                {item.message}
              </Text>
            }
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
              <Text
                style={{
                  // paddingHorizontal: 5,
                  paddingVertical: 5,
                  color: item.from != userDetails.id ? '#000' : '#fff',
                  fontSize: 8,
                  textAlign: item.from == userDetails.id ? 'left' : 'right'
                }}>
                {item?.sendTime ? moment(item.sendTime).format('yyyy-MM-DD | HH:mm:ss') : ''}
                {/* {new Date(item?.sendTime).toUTCString()} */}
              </Text>
              {item.from == userDetails.id ?
                item.readStatus == 'unread' ?
                  <Icon
                    name='done'
                    type='MaterialIcon'
                    color={Theme.colors.white}
                    size={12}
                    style={{ margin: 5, }}

                  /> :
                  <Icon
                    name='done-all'
                    type='MaterialIcon'
                    color={'skyblue'}
                    size={12}
                    style={{ margin: 5, }}

                  /> : null}

            </View>
          </View>
        </View>
      </View>

    </Pressable>
  );

  const ref = useRef();

  const scrollToIndex = (index) => {
    if (allChat.length > 0) {
      ref?.current?.scrollToIndex({
        animated: true,
        // index: allChat.length - 1,
        index: index,
      });
    }
  }
  const flatll = useMemo(() => {
    return (
      <FlatList
        data={allChat}
        keyExtractor={(item,index) => index}
        //   keyExtractor={item => item.from}
        inverted
        renderItem={renderItem}
        // initialScrollIndex={0}
        initialNumToRender={10}
        onScroll={(pr) => {
          if (pr.nativeEvent.contentOffset.y > 300) {
            setShowScrollDown(true)
          } else {
            setShowScrollDown(false)
          }
        }}
        ref={ref}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    )
  }, [allChat])
  const txtinp = useMemo(() => {
    return (
      <TextInput
        ref={refv}
        value={message}
        onChangeText={a => setMessage(a)}
        placeholder="Type your message here..."
        placeholderTextColor={'#747A82'}
        inputStyle={{ fontSize: 15, color: 'black' }}
        titleStyle={{
          fontFamily: Theme.FontFamily.normal,
          fontSize: Theme.sizes.s14,
        }}
        onFocus={() => {
          refv.current.focus()
          setIsFocused(true)
        }}
        onBlur={() => {
          refv.current.blur()
          setIsFocused(false)
        }}
        style={
          {
            //   marginHorizontal:20
            height: 60,
            // elevation: 5,
            paddingLeft: 10,
            // paddingBottom
            // height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: '#F9F6F6',
            borderWidth: 0,
            width: width / 1.8,
            borderColor: '#DFDFDF',
            // borderColor: 'black',
            color:'#000',
            backgroundColor: 'white'
          }
        }
        //  multiline
        inputContainerStyle={{
          paddingHorizontal: 10,
          // height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: '#F9F6F6',
          borderWidth: 0,
          width: width / 1.9,
          borderColor: '#DFDFDF',
          // alignSelf: 'center',
          // marginTop: 25
        }}
      // text_style={styles.text_style}
      />
    )
  }, [message])

  useEffect(() => {
    if (roomId == null) {
      console.log("Use effect room id is black ....")
    } else {
      setloadingState(true)
      console.log("Use effect room id is available :", roomId)
      // var onListChanger ="";
      const onValueChange = database().ref(`/messages/${slugType}/${roomId}`)
        // .orderByChild('sendTimeUTC')
        .on('value', snapshot => {
          console.log("snanpgetet", snapshot)
          if (snapshot.val()) {
            // const array = Object.values(snapshot.val()).sort((a, b) =>  a.sendTime - b.sendTime );
            if(snapshot.exists()){
            const array = Object.values(snapshot.val()).sort((a, b) => b.sendTimeUTC - a.sendTimeUTC);
            setallChat([]);
            setallChat(array)
            if (allChat.length > 0) {
              scrollToIndex(0)
            }

            const filteredUsers = Object.values(snapshot.val()).filter((userr, index) => userr.from != userDetails.id);
            if (filteredUsers.length > 0) {
              console.log('filteredUsers', filteredUsers)
              filteredUsers.forEach(async user => {
                try {
                  if(user.id){
                    database()
                      .ref(`/messages/${slugType}/${roomId}/${user.id}`)
                      .update({ readStatus: 'read' });

                    console.log(`User ${user.from} status updated successfully.`);
                  }
                } catch (error) {
                  console.error(`Error updating user ${user.from} status:`, error);
                }
              });
            }
          }
          }
          // getFirebaseListener()
          setloadingState(false)
        })
       
        const onListChanger =  database().ref(`chat_history/${roomId}`)
            // .orderByChild('receiepnts/participants_' + userDetails.id)
            // .equalTo(userDetails.id)
            .on('value', snapshot => {
              if(snapshot.exists()){
            console.log("ssdsd",snapshot.val())
            // const array = Object.values(snapshot.val()).sort((a, b) => b.sendTime - a.sendTime);
            console.log('Object.keys(snapshot.val())',Object.keys(snapshot.val()))
            if(snapshot.val()["from"] != userDetails.id){
           
    
              database()
                  .ref(`/chat_history/${roomId}`)
                  .update({ readStatus: 'read' });
            }
          
          }
            })
            
      
    }
   // Stop listening for updates when no longer required
return () => {
  database().ref(`chat_history/${roomId}`).off('value', onListChanger)
  database().ref(`/messages/${slugType}/${roomId}`).off('value', onValueChange)
}
   
  }, [])


  return (
    <ScreenLayout
      headerStyle={{ backgroundColor: '#fff' }}
      showLoading={loadingState || Loder}
      //   isScrollable={true}
      Chat
      host={propertyImage}
      property={hostData.name + '\n' + '(' +propertyName + ')'}
      
      Watch
      leftHeading={hostData.name + ", " + userDetails.first_name + " " + userDetails.last_name + "(Guest)"}
      viewStyle={{ backgroundColor: '#fff', width: width }}
      hideLeftIcon={customProp ? false : true}
      onLeftIconPress={() => NavigationService.back()}
    >
      {console.log('booking_id',imageload)}
     
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#F9F6F6', alignItems: 'center', paddingBottom: 75,}}>
        <>
        <View>
          {flatll}
        </View>
        <View style={{
          height: 75, width: width,
          borderRadius: 0, backgroundColor: '#fff', paddingBottom: 5,
          flexDirection: 'row', position: 'absolute', bottom: 0, paddingHorizontal: 10, justifyContent: 'space-evenly',
          borderWidth: 1.3, borderColor: '#0000000D', alignItems: 'center',
        }}>
          <Pressable
            disabled={roomId == null}
            onPress={imageUploadCamera}
            style={{
              height: 32, width: 32,
              borderRadius: 32, justifyContent: 'center',
              backgroundColor: '#E15454', alignItems: 'center'
            }}>
            <CameraIcon />
          </Pressable>
          {txtinp}
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: width / 5 }}>
            <Pressable disabled={roomId == null} onPress={imageUpload}>
              <GalleryIcon />
            </Pressable>
            {IsFocused ?
            disabled ? <ActivityIndicator color={'#000'} size='small' /> :
            <Pressable
            disabled={disabled}
            >
              <Icon
                name='send-sharp'
                type='Ionicons'
                color={Theme.colors.black}
                size={23}
                style={{ marginLeft: 5 }}
                onPress={() => roomId == null ? setChatRoomId() : sendMsg()}
              /></Pressable>
              :  <Pressable
              disabled={disabled}
              >
                <Icon
                  name='send-sharp'
                  type='Ionicons'
                  color={Theme.colors.black}
                  size={23}
                  style={{ marginLeft: 5 }}
                  onPress={() => roomId == null ? setChatRoomId() : sendMsg()}
                /></Pressable>}

          </View>
        </View>
      </>
      </KeyboardAwareScrollView>
    
    </ScreenLayout>
  )
}

export default ChatPage

const styles = StyleSheet.create({
  text_style: {
    fontFamily: Theme.FontFamily.normal,
    width: '100%',
    fontSize: 14,
    color: '#000',
  },
  messageContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 8,
    paddingVertical: 10,
    height: 80, backgroundColor: 'rgba(27, 27, 27, 0.96)',
    width: width,
    padding: 15
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    color: Theme.colors.black,
    backgroundColor: 'transparent', textAlignVertical: 'top', paddingTop: 10,
    paddingBottom: 10,
    flex: 1, padding: 10


  },
  sendButton: {
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40, width: 40,
    justifyContent: 'center',
    alignItems: 'center'

  },
  downButton: {
    borderRadius: 5,
    //backgroundColor:'white',
    height: 30, width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3

  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  masBox: {
    alignSelf: 'flex-end',
    marginHorizontal: 15,
    minWidth: 80,
    maxWidth: '75%',
    marginVertical: 5,
    padding: 4,
    paddingHorizontal: 7,
    borderRadius: 8,
    flexDirection: 'row'
  },
  timeText: {
    fontFamily: 'AveriaSerifLibre-Light',
    fontSize: 10,
  },
  dayview: {
    alignSelf: 'center',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.white,
    borderRadius: 30,
    marginTop: 10,
  },
  iconView: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.themecolor,
  },
  TriangleShapeCSS: {
    position: 'absolute',
    // top: -3,
    width: 0,
    height: 0,
    // borderBottomLeftRadius:5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 5,
    borderBottomWidth: 20,
    // borderTopWidth:100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // borderBottomColor: '#757474'
  },
  left: {
    borderBottomColor: Theme.colors.white,
    // borderBottomColor: 'red',
    left: 55,
    bottom: 5,
    transform: [{ rotate: '0deg' }],
  },
  right: {
    // borderBottomColor: 'red',
    borderBottomColor: Theme.colors.secondary,
    right: 5,
    // top:0,
    bottom: 2.5,
    transform: [{ rotate: '103deg' }],
  },
})

