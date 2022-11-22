import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ProfileCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={{flex:2, alignItems:'center'}}>
        <Image
        style={{width: 50, height: 50, borderRadius: 25, borderWidth: 4, borderColor:'#eee'}}
          source={{
           uri: props.profilePic ||'https://res.cloudinary.com/dqwbl8iq2/image/upload/v1668872408/default-profile-pic-e1513291410505_svzzt5.jpg'
          }}
        />
      </View>
      <View style={{flex:4}}>
        <Text style={{color:"#eee"}}>@{props.username || 'Username'}</Text>
        <View style={{borderBottomWidth: 1, marginVertical: 4, borderColor: "#444"}}></View>
        <Text style={{color:'#eee'}}>{props.bio || 'here goes a cheezy bio'}</Text>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 100,
    backgroundColor: "#222",
    alignContent: "center",
    marginHorizontal: "auto",
    alignSelf: "center",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10
  },
});
