import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import React, { useContext, useState } from "react";
import { loginUser } from "../controllers/api";
import { Context } from "../controllers/context";
import GlobalHeader from "../components/GlobalHeader";

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(Context);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const loginBtn = async () => {
    const res = await loginUser(inputs);
    setInputs({
      username: "",
      password: "",
    });

    setUser(res.data);

    console.log(res.data)

    navigation.navigate("Home");
  };

  const inputChange = (name, data) => setInputs({ ...inputs, [name]: data });
  return (
    <View style={styles.container}>
      <GlobalHeader name='Login'/>
      <TextInput
        value={inputs.username}
        onChangeText={(text) => {
          inputChange("username", text);
        }}
        placeholder="username"
      />
      <TextInput
        value={inputs.password}
        onChangeText={(text) => {
          inputChange("password", text);
        }}
        placeholder="password"
        secureTextEntry
      />
      <TouchableOpacity onPress={() => loginBtn()}>
        <View>
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
        <View>
          <Text>Register</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
});
