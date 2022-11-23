import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
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
  const { user } = useContext(Context);
  const isFocused = useIsFocused();

  useEffect(() => {
    retrieveTweetsByUser(user.id).then((res) => {
      setTweets(res.data);
    });
  }, [isFocused]);

  const checkAuthority = (tweet, userId) => {
    if (tweet.userId === userId) {
      return (
        <TweetCard
          isAuthor
          key={tweet.id}
          username={tweet.owner}
          date={`${moment(tweet.date).fromNow()} ago`}
          content={tweet.content}
        />
      );
    } else {
      return (
        <TweetCard
          key={tweet.id}
          username={tweet.owner}
          date={`${moment(tweet.date).fromNow()} ago`}
          content={tweet.content}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <GlobalHeader name="Home" hasProfilePic />

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
          ? tweets.map((tweet) => checkAuthority(tweet, user.id))
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
