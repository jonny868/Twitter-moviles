import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../controllers/context";
import GlobalHeader from "../components/GlobalHeader";
import { retrieveTweetsByUser } from "../controllers/api";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [tweets, setTweets] = useState(null);
  const { user } = useContext(Context);
  const isFocused = useIsFocused()


  useEffect(() => {
    retrieveTweetsByUser(user.id).then(res =>{
      setTweets(res.data)
    })
  }, [isFocused])

  return (


    <View style={styles.container}>
     <GlobalHeader name="Home" />


      <TouchableOpacity
        style={styles.newTweetBtn}
        onPress={() => {
          navigation.navigate("NewTweet");
        }}
      >
        
        <View>
          <FontAwesome5 name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>

        {tweets !== null ? tweets.map(tweet => <Text key={tweet.id}>{tweet.content}</Text>):null}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  newTweetBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#f4511e",
    padding: 30,
    borderRadius: 50,
  },
});
