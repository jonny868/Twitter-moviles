import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Keyboard
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

    console.log(res.data);

    navigation.navigate("Home");
  };

  const inputChange = (name, data) => setInputs({ ...inputs, [name]: data });
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
        <GlobalHeader name="Login" />
        <View style={styles.cardContainer}>
          <TextInput
            style={styles.input}
            value={inputs.username}
            onChangeText={(text) => {
              inputChange("username", text);
            }}
            placeholder="username"
          />
          <TextInput
            style={styles.input}
            value={inputs.password}
            onChangeText={(text) => {
              inputChange("password", text);
            }}
            placeholder="password"
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginBtn} onPress={() => loginBtn()}>
            <View>
              <Text style={{ fontSize: 15, color: "#eee", fontWeight: "bold" }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginVertical: 20,
            }}
          >
            <Text>Don't have an account? </Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ color: "#fff" }}>Register</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  cardContainer: {
    backgroundColor: "#f4511e",
    position: "absolute",
    top: 300,
    width: 380,
    alignSelf: "center",
    borderRadius: 5,
    height: 340,
    paddingTop: 10,
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
  loginBtn: {
    borderRadius: 5,
    borderWidth: 3,
    height: 40,
    width: 100,
    marginVertical: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#eee",
  },
});
