import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import moment from "moment";

import GlobalHeader from "../components/GlobalHeader";
import { retrieveSearch } from "../controllers/api";
import ProfileCard from "../components/ProfileCard";
import TweetCard from "../components/TweetCard";
import { Context } from "../controllers/context";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [input, setInput] = useState();
  const [tweets, setTweets] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const { user, setTweetData } = useContext(Context);
  const navigation = useNavigation();
  //Change input value
  const inputChange = (text) => {
    setInput(text);
  };

  const searchBtn = () => {
    retrieveSearch(input).then((res) => {
      setProfiles(res.profiles);
      setTweets(res.tweets);
      console.log(profiles);
      console.log(tweets);
    });
  };
  return (
    <View style={styles.container}>
      <GlobalHeader hasBack={true} name="Search" />
      <View style={styles.searchBar}>
        <TextInput
          style={{ fontSize: 18, color: "#666" }}
          placeholder="Search here"
          placeholderTextColor="#ccc"
          onChangeText={(data) => {
            inputChange(data);
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            searchBtn();
          }}
        >
          <Entypo name="magnifying-glass" size={24} color="#f4511e" />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ height: 180 }}>
        <Swiper>
          {profiles !== null ? (
            profiles.map((profile) => {
              return (
                <View key={profile.id}>
                  <ProfileCard
                    username={profile.username}
                    bio={profile.bio}
                    user={profile.id}
                    data={user.id}
                  />
                </View>
              );
            })
          ) : (
            <Text>Nothing to see here</Text>
          )}
        </Swiper>
      </View>
      <View style={{ height: 200 }}>
        <Swiper>
          {tweets !== null ? (
            tweets.map((tweet) => {
              return (
                <TouchableOpacity key={tweet.id} onPress={() => {
                  setTweetData(tweet)
                  navigation.navigate('Tweet')}}>
                  <TweetCard
                    username={tweet.owner}
                    date={`${moment(tweet.date, "LLL").fromNow()} ago`}
                    content={tweet.content}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>Nothing to see here</Text>
          )}
        </Swiper>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  searchBar: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#f4511e",
  },
});
