// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Loader from './Components/Loader';
import {API_URL} from "@env"

const RegisterScreen = (props) => {

  const [phoneNum, setPhoneNum] = useState('')
  const [userPassword, setUserPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  //   const emailInputRef = createRef();
  //   const ageInputRef = createRef();
  //   const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = async () => {
    setErrortext('');
    if (!phoneNum) {
      alert("Please fill Phone Number")
      return
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if (!repeatPassword) {
      alert("Please fill Repeat Password")
      return
    }
    if (repeatPassword !== userPassword) {
      alert("Password and repeat password must be same")
      return
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      phone_num: phoneNum,
      password: userPassword,
      repeat_password: repeatPassword,
      role: "consumer"
    };

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
        },
      })

      console.log(response)
      var responseJson = await response.json()
      setLoading(false)
      console.log(responseJson)

      if (response.status === 201) {
        setIsRegistraionSuccess(true);
        console.log(
          'Registration Successful. Please Login to proceed'
        );
      }
      else {
        setErrortext(responseJson.detail)
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/logoBK.png')}
          style={{
            height: 200,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../Image/logoBK.png')}
            style={{
              width:  160,
              height: 160,
              resizeMode: 'contain',
              marginBottom: 30,
              marginTop:40,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(phoneNum) => setPhoneNum(phoneNum)}
              underlineColorAndroid="#f000"
              placeholder="Enter Phone Number"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              keyboardType="numeric"
              //   onSubmitEditing={() =>
              //     emailInputRef.current && emailInputRef.current.focus()
              //   }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              //   ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              //   onSubmitEditing={() =>
              //     ageInputRef.current &&
              //     ageInputRef.current.focus()
              //   }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Repeat Password"
              placeholderTextColor="#8b9cb5"
              //   ref={ageInputRef}
              returnKeyType="next"
              secureTextEntry={true}

              //   onSubmitEditing={() =>
              //     addressInputRef.current &&
              //     addressInputRef.current.focus()
              //   }
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#0f68a0',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 50,
    marginBottom: 20,
  },
  buttonTextStyle: {
    paddingVertical: 10,
    fontSize: 16,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'black', // Adjust as desired
    textAlign: 'center',
    fontSize: 18,
    padding: 40,
    fontWeight: 'bold',
  },
});