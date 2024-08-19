import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

const OtpInput = ({ numInputs = 4, onComplete,editable=true }) => {
  const [otp, setOtp] = useState(Array(numInputs).fill(''));
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value !== '' && index < numInputs - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all inputs are filled
    if (newOtp.every((code) => code !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (index, key) => {
    // Move to previous input if current input is empty and backspace is pressed
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {/* {console.log(Dimensions.get('window').width )} */}
      {Array(numInputs)
        .fill()
        .map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={otp[index]}
            editable={editable}
            cursorColor={'#000'}
            onChangeText={(value) => handleOtpChange(index, value)}
            onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent:'space-evenly',
    width:Dimensions.get('window').width -50
  },
  input: {
    width:Dimensions.get('window').width <395 ? 43: 52,
    height:Dimensions.get('window').width <395 ?43: 52,
    borderWidth: 1,
    borderRadius: 8,
    borderColor:'#000',
    textAlign: 'center',color:'#000',
    fontSize: 20,
  },
});

export default React.memo(OtpInput);
