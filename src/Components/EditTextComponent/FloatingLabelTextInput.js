import React, { useState, useRef } from 'react';
import { Text } from 'react-native';
import { View, TextInput, Animated, StyleSheet, TouchableOpacity, Platform, I18nManager } from 'react-native';
import { Icon } from 'react-native-basic-elements';
import Theme from '../../Constants/Theme';


const FloatingLabelTextInput = ({widthh='100%', label,leftcomponent,edit=true,  numb=false,emai=false, secureTextEntry = false, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [numberr,setNumberr] =  useState(numb)
  const [Emaill,setEmaill] =  useState(emai)

  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const animatedIsFocused = useRef(new Animated.Value(props.value ? 1 : 0)).current;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const animatedLabelStyle = {
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 3],
    }),
    // left: animatedIsFocused.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [10, 0],
    // }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 11],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  React.useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || props.value) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, props.value, animatedIsFocused]);

  return (
    <View style={{...styles.container,width:widthh}}>
      
      <View style={{...styles.inputContainer,
      borderWidth:isFocused ? 1.5 : 0.9,
      borderColor: isFocused ? '#000' :'#aaa'
      }}>
       
      <Animated.Text style={[styles.label, animatedLabelStyle]}>
        {label}
      </Animated.Text>
     
        <TextInput
          {...props}
          style={[styles.input, styles.inputFocused]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={edit}
          blurOnSubmit={true}
         
          // cursorColor={'#000'}
          secureTextEntry={isSecure}
          keyboardType={numberr ? 'number-pad' : Emaill ? 'email-address' :'default' }
        />
        {leftcomponent }
        {secureTextEntry && (
          <TouchableOpacity style={styles.visibilityIcon} onPress={toggleSecureEntry}>
            <Icon name={isSecure ? 'eye-off' : 'eye'}  type='Feather' color="#000" size={20} />
            {/* <MaterialIcons name={isSecure ? 'visibility-off' : 'visibility'} size={24} color="#888" /> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 18,
    width: '100%',height:56,marginTop:12
  },
  label: {
    position: 'absolute',
    left: 10,paddingTop:1
    // top:5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius:5,
    // paddingLeft:Platform.OS === 'ios' ? 3 : 6,
    paddingTop:1
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    paddingTop:20,color:'#000'
  },
  inputFocused: {
    borderColor: 'blue', // Change the border color when focused
  },
  visibilityIcon: {
    position: 'absolute',
    right: 2,
    padding: 10,
  },
});

export default React.memo(FloatingLabelTextInput);
