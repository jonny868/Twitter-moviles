import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import NewTweet from "./src/screens/NewTweet";
import { Context } from "./src/controllers/context";
import { useState } from "react";
import SeachScreen from "./src/screens/SeachScreen";

export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();


  const [user, setUser] = useState({
    username:'',
    email:'',
    id:'',
    date:'',
    bio:'',
    profilePicture: ''
  })
  return (
    <Context.Provider value={{
      user, setUser
    }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            animation: "flip",
            headerShown: false
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            name="NewTweet"
            component={NewTweet}
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Search" component={SeachScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{
          animation: "slide_from_right",
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
