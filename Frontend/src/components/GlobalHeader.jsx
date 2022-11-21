import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../controllers/context";

const GlobalHeader = (props) => {
    const navigation = useNavigation();
    const {user} = useContext(Context)
    const imgUri = user.profilePicture

    
  return (
    <SafeAreaView style={styles.container}>
      {props.hasBack === true ?
      
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Home');
      }}>
        <Ionicons
          style={styles.backBtn}
          name="chevron-back-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      :<Text>HEHE</Text>}
      <Text style={styles.headerText}>{props.name}</Text>
      <Image source={{ uri: imgUri || 'https://res.cloudinary.com/dqwbl8iq2/image/upload/v1668872408/default-profile-pic-e1513291410505_svzzt5.jpg'}} style={styles.profilePic} />
    </SafeAreaView>
  );
};

export default GlobalHeader;

const styles = StyleSheet.create({
  container: {
    color: "white",
    backgroundColor: "#f4511e",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  headerText: { color: "white", fontSize: 20 },
  backBtn: { color: "white" },
  profilePic:{
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "white",

  }
});
