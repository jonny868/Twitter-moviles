import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { followUser } from "../controllers/api";


const followBtn = ()=>{
followUser(data, user)
}



const ProfileCard = (props) => {
  
  const [isFollowed, setIsFollowed] = useState(false)
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
        <View style={{flexDirection:'row'}}>
        <Text style={{color:"#eee", flex:2}}>@{props.username || 'Username'}</Text>
        <TouchableOpacity onPress={()=>followUser(props.data, props.user)}>
          <View style={styles.followBtn}>
        <Text style={{color:"#eee"}}>Follow</Text>

          </View>

        </TouchableOpacity>

        </View>
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
  followBtn:{
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal:10,
    borderColor: "#eee",
    borderRadius: 5

  }
});
