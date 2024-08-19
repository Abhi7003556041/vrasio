import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../Constants/Theme';

const ChatListComp = ({allChat}) => {
  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => {
      // refv.current.blur()
      // setIsFocused(false)
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
        {item.from != userDetails.id ?
          <Image
            source={{uri:hostData?.avatar}}
            style={{
              width: 45,
              height: 45,
              borderRadius: 30,
              marginLeft: 0,
            }}
            resizeMode='cover'
          />
          : null
        }
        <View
          style={[
            styles.masBox,
            {
              alignSelf: item.from == userDetails.id ? 'flex-end' : 'flex-start',
              backgroundColor: item.from != userDetails.id ? '#fff' : Theme.colors.primary, marginTop: 6
              //   borderWidth:0.5,borderColor:'#EBEBEB'
            },
          ]}>

          <View style={{ padding: 5 }}>
            {item?.msgType == 'File' ?
              <Image
                source={{ uri: item?.message }}
                style={{
                  width: width / 2.2,
                  height: 200,
                  borderRadius: 10,
                  marginLeft: 0,
                }}
              /> :
              <Text
                style={{
                  // paddingHorizontal: 5,
                  paddingTop: 8,
                  color: item.from != userDetails.id ? '#000' : '#fff',
                  fontSize: 13,
                  // letterSpacing:0.5
                }}>
                {item.message}
              </Text>
            }
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:3}}>
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
            {item.from == userDetails.id?
            item.readStatus == 'unread' ?
            <Icon
                name='done'
                type='MaterialIcon'
                color={Theme.colors.white}
                size={11}
                style={{ margin: 5,}}
               
              /> :
              <Icon
              name='done-all'
              type='MaterialIcon'
              color={Theme.colors.white}
              size={11}
              style={{ margin: 5,}}
             
            /> : null}
</View>
          </View>
        </View>
      </View>
    </Pressable>
  );
  return (
    <View>
      <FlatList
            data={allChat}
            keyExtractor={item => item.id.toString()}
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
    </View>
  )
}

export default ChatListComp

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
    marginHorizontal: 20,
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
    borderBottomColor: Theme.colors.primary,
    right: 5,
    // top:0,
    bottom: 2.6,
    transform: [{ rotate: '103deg' }],
  },
})