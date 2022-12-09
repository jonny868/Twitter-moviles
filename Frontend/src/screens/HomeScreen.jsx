import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../controllers/context";
import GlobalHeader from "../components/GlobalHeader";
import { retrieveTweets } from "../controllers/api";
import { useIsFocused } from "@react-navigation/native";
import TweetCard from "../components/TweetCard";

const moment = require("moment");
const HomeScreen = ({ navigation }) => {
  const [tweets, setTweets] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, reload, tweetData, setTweetData } = useContext(Context);
  const isFocused = useIsFocused();

  const formatDate = (date) => moment(date, "LLL").fromNow();

  useEffect(() => {
    setLoading(true);
    retrieveTweets(user.id).then((res) => {
      setTweets(res.data.reverse());
      // console.log(tweets);
    });
    setLoading(false);
  }, [isFocused, reload]);

  const renderItem = ({ item }) => {
    return (<TweetCard
    username={item.owner}
    content={item.content}
    tweetId={item.id}
    tweetLikes={item.likesCount}
    date={formatDate(item.date)}
    isAuthor={item.userId === user.id?true:false}
    />)
  }
    
  return (
    <View style={styles.container}>
      <GlobalHeader name="Home" hasProfilePic hasSearch hasFavs />

      {/* NEW TWEET BTN */}
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

      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={tweets}
            renderItem={renderItem}
            keyExtractor={(tw) => tw.id}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ height: 100 }}
          />
        )}
      </View>
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
