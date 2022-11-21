import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { registerUser } from "../controllers/api";

const RegisterScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const inputChange = (name, data) => {
    setInputs({ ...inputs, [name]: data });
  };

  const registerBtn = async () => {
 const res = await registerUser(inputs)
    console.log(res);
    navigation.navigate('Login')
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => inputChange("username", text)}
          value={inputs.username}
          placeholder="Username"
        />
        <TextInput
          onChangeText={(text) => inputChange("email", text)}
          value={inputs.email}
          placeholder="Email@email.com"
        />
        <TextInput
          onChangeText={(text) => inputChange("password", text)}
          value={inputs.password}
          placeholder="Password"
        />
        <TextInput
          onChangeText={(text) => inputChange("confirmPassword", text)}
          value={inputs.confirmPassword}
          placeholder="Password"
        />

        <TouchableOpacity onPress={() => registerBtn()}>
          <View>
            <Text>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
