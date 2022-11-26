import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { registerUser } from "../controllers/api";
import GlobalHeader from "../components/GlobalHeader";

const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    bio: "",
    dob: date,
    confirmPassword: "",
  });

  const inputChange = (name, data) => {
    setInputs({ ...inputs, [name]: data });
  };
  const clearInputs = () => {
    setInputs({
      username: "",
      name: "",
      email: "",
      bio: "",
      location: "",
      password: "",
      dob:"",
      confirmPassword: "",
    });
  };

  const registerBtn = async () => {
    console.log(inputs)
    const res = await registerUser(inputs);
    navigation.navigate("Login");
  };
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  
  

  const formatDate = (uglyDate) => {
    setShow(false);
    let tempDate = new Date(uglyDate);
    let fDate = `${tempDate.getDate()}/${tempDate.getMonth()+1}/${tempDate.getFullYear()}`
    setDate(fDate)
    inputChange("dob", fDate)
    setShow(false)
    
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <GlobalHeader name="Register" hasBack={true} />
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => inputChange("username", text)}
            value={inputs.username}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => inputChange("name", text)}
            value={inputs.name}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => inputChange("email", text)}
            value={inputs.email}
            placeholder="Email@email.com"
          />
          {/* DATEPICKER CONTAINER */}
          <View style={[styles.input,{flexDirection: "row", justifyContent:"space-between"}]}>
            <TextInput
              value={inputs.dob}
              editable={false}
              placeholder="DOB"
            />
            <TouchableOpacity onPress={() => setShow(true)}>
              <View style={{alignContent:"center"}}>
                <Text>Select DOB</Text>
              </View>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                display="default"
                minimumDate={new Date("1985-02-22")}
                maximumDate={new Date("2015-12-01")}
                onChange={(e)=>{
                  formatDate(e.nativeEvent.timestamp)
                  // setDate(new Date(e.nativeEvent.timestamp))
                  
                  console.log(date)
                }}
              />
            )}
          </View>

          <TextInput
            multiline
            numberOfLines={3}
            maxLength={140}
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            onChangeText={(text) => inputChange("bio", text)}
            value={inputs.bio}
            placeholder="Bio"
          />
          <TextInput
            onChangeText={(text) => inputChange("location", text)}
            style={styles.input}
            value={inputs.location}
            placeholder="Location"
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
            secureTextEntry
          />

          <TouchableOpacity onPress={() => registerBtn()}>
            <View style={styles.registerBtn}>
              <Text style={{ fontSize: 15, color: "#eee", fontWeight: "bold" }}>
                Register
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => clearInputs()}>
            <View style={styles.clearBtn}>
              <Text style={{ fontSize: 15, color: "#eee", fontWeight: "bold" }}>
                Clear
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  card: {
    paddingTop: 20,
    marginTop: 10,
    width: 380,
    height: 700,
    backgroundColor: "#f4511e",
    alignSelf: "center",
  },
  registerBtn: {
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
  clearBtn: {
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
