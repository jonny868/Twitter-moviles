import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import NewTweet from "./src/components/NewTweet";

export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          animation: "flip",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation})=>({
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerRight: ()=>(
              <Text onPress={()=> navigation.navigate('Login')}>Login</Text>
            )
          })}
        />

        <Stack.Screen
          name="NewTweet"
          component={NewTweet}
          options={{
            presentation: "modal",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTitleAlign: "center",
            headerTintColor: "white",
            animation: "slide_from_bottom"
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
