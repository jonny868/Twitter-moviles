import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { registerUser } from "../controllers/api";
import GlobalHeader from "../components/GlobalHeader";

const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    bio: "",
    confirmPassword: "",
  });

  const inputChange = (name, data) => {
    setInputs({ ...inputs, [name]: data });
  };
const clearInputs = () =>{
  setInputs({username: "",
  password: "",
  email: "",
  bio: "",
  confirmPassword: "",})
}
  const registerBtn = async () => {
    const res = await registerUser(inputs);
    console.log(res);
    navigation.navigate("Login");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <GlobalHeader name="Register" hasBack={true} />
        <View style={styles.registerCard}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => inputChange("username", text)}
            value={inputs.username}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => inputChange("email", text)}
            value={inputs.email}
            placeholder="Email@email.com"
          />
          <TextInput
          multiline
          numberOfLines={3}
          maxLength={140}
          style={[styles.input,{ height: 100, textAlignVertical:"top" }]}
          onChangeText={(text) => inputChange("bio", text)}
          value={inputs.bio}
          placeholder="Bio"
          />
          <TextInput
            onChangeText={(text) => inputChange("password", text)}
            style={styles.input}
            value={inputs.password}
            placeholder="Password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => inputChange("confirmPassword", text)}
            value={inputs.confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry12
          />

          <TouchableOpacity onPress={() => registerBtn()}>
            <View style={styles.registerBtn}>
              <Text style={{fontSize: 15, color: '#eee', fontWeight: 'bold'}}>Register</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => clearInputs()}>
            <View style={styles.clearBtn}>
              <Text style={{fontSize: 15, color: '#eee', fontWeight: 'bold'}}>Clear</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 10,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  registerCard: {
    backgroundColor: "#f4511e",
    alignSelf: "center",
    width: 380,
    height: 500,
    marginVertical: 20,
    position: 'absolute',
    top: 100,
    borderRadius: 5
  },
  registerBtn:{
    borderRadius: 5,
    borderWidth: 3,
    height:40,
    width: 100,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eee',
  },
  clearBtn:{
    borderRadius: 5,
    borderWidth: 3,
    height:40,
    width: 100,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eee',
  }
});
