import { Dimensions, StyleSheet, View, PanResponder, Animated, Easing } from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import { moderateScale } from "../../Constants/PixelRatio"
import { Keyboard } from "react-native"

const { height: SCREEN_HEIGHT } = Dimensions.get("screen")

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

const BottomSheet = ({ children,onstartUp,headerItems }) => {
  const translateY = useRef(new Animated.Value(-SCREEN_HEIGHT +51)).current
  const [active, setActive] = useState(false)
  const context = useRef({ y: 0 }).current
  const togglePanel = () => {

    Animated.timing(translateY, {
      duration: 500,
      easing: Easing.ease,
      toValue: translateY._value === 0
        ? SCREEN_HEIGHT
        : 0,
      useNativeDriver: false,
    }).start(() => {
      setActive(!active)
     
        if (active) {
          props.func(false)
          
        } else {
          props.func(true)
         
          Keyboard.dismiss();
        }
      });
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        context.y = translateY._value
      },
      onPanResponderMove: (_, gestureState) => {
        if(translateY._value >300 ){console.log('zdzdas')}
        translateY.setValue(gestureState.dy + context.y)
        translateY.setValue(Math.max(translateY._value, MAX_TRANSLATE_Y))
        translateY.setValue(Math.min(translateY._value, -100))
        console.log(Math.abs(translateY._value))
        
        onstartUp(Math.abs(translateY._value))
      },
      onPanResponderRelease: () => {
        // Handle release if needed
      },
    })
  ).current


  const rBottomSheetStyle = {
    borderRadius: translateY.interpolate({
      inputRange: [ MAX_TRANSLATE_Y,MAX_TRANSLATE_Y + 50],
      outputRange: [5,25],
      extrapolate: 'identity',
    }),
    transform: [{ translateY: translateY }],
  }

  return (

      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View {...panResponder.panHandlers}  >
       {/* {console.log('object,',panResponder.panHandlers)} */}
            <TouchableOpacity style={[styles.lineContainer]}>
              <View style={[styles.line]} />
            </TouchableOpacity>
         
        </View>
        {children}
      </Animated.View>
    
  )
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT +moderateScale(72) ,
    borderRadius: 25,
    zIndex:9999999,
  },
  container: {
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    paddingHorizontal: 21,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#ffffff',
  },
  lineContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 35,
    height: 4,
    borderRadius: 2,
    marginTop: 18,
    marginBottom: 20,
    backgroundColor: '#D5DDE0',
  },
  outerContent: {
    flex: -1,
  },
  innerContent: {
    flex: -1,
  },
  
})

export default BottomSheet
