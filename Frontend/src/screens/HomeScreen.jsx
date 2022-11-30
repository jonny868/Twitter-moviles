import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../controllers/context";
import GlobalHeader from "../components/GlobalHeader";
import { retrieveTweetsByUser } from "../controllers/api";
import { useIsFocused } from "@react-navigation/native";
import TweetCard from "../components/TweetCard";

const moment = require("moment");
const HomeScreen = ({ navigation }) => {
  const [tweets, setTweets] = useState(null);
  const { user, reload, tweetData, setTweetData } = useContext(Context);
  const isFocused = useIsFocused();
  // const [tweetData, setTweetData] = useState(null);

  useEffect(() => {
    retrieveTweetsByUser(user.id).then((res) => {
      setTweets(res.data);
    });
  }, [isFocused, reload]);
  //ELIMINAR TWEET

  //VALIDANDO SI EL TWEET ES DEL USUARIO LOGEADO PARA MOSTRAR EL BOTON DE DELETE
  const checkAuthority = (tweet, userId) => {
    if (tweet.userId === userId) {
      return (
        <TweetCard
          isAuthor
          username={tweet.owner}
          date={`${moment(tweet.date).fromNow()} ago`}
          content={tweet.content}
          tweetId={tweet.id}
        />
      );
    } else {
      return (
        <TweetCard
          username={tweet.owner}
          date={`${moment(tweet.date).fromNow()} ago`}
          content={tweet.content}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <GlobalHeader name="Home" hasProfilePic hasMenu />

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

      <ScrollView>
        {tweets !== null
          ? tweets.map((tweet) =>(
            <TouchableOpacity  key={tweet.id} onPress={() => {
              setTweetData(tweet)
              navigation.navigate('Tweet')
            }} >

              {checkAuthority(tweet, user.id)}
            </TouchableOpacity>
             ))
          : null}
      </ScrollView>
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
    zIndex: 2,
    bottom: 10,
    right: 10,
    backgroundColor: "#f4511e",
    padding: 30,
    borderRadius: 50,
  },
});
