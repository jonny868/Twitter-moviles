import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React, { useContext } from "react";
import { Context } from "../controllers/context";
import { AntDesign } from "@expo/vector-icons";
import { deleteCommentById } from "../controllers/api";

const CommentCard = (props) => {
  const { user, setReload } = useContext(Context);

  const deleteComment = async(id,tweetId)=>{
    const response = await deleteCommentById(id,tweetId)
    setReload(true)
    console.log(response.data)
    
    return response
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal:5, alignContent:'center' }}>
        <Text style={{flex:3}}>@{props.username}</Text>
        <Text style={{flex:2}}>{props.date}</Text>
      {user.id === props.userId ? (
        <TouchableWithoutFeedback onPress={()=>(deleteComment(props.id, props.tweetId))}>

            <AntDesign style={{alignSelf:'center'}} name="close" size={15} color="black" />
        </TouchableWithoutFeedback>
      ) : null}
      </View>
      <Text>{props.content}</Text>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: 350,
    height: 100,
    maxHeight: 150,
    backgroundColor: "#666",
    marginVertical: 5,
  },
});
