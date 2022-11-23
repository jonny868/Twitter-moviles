import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

import GlobalHeader from "../components/GlobalHeader";
import { retrieveSearch } from "../controllers/api";
import ProfileCard from "../components/ProfileCard";
import TweetCard from "../components/TweetCard";

const SeachScreen = () => {
  const [input, setInput] = useState();

  const [tweets, setTweets] = useState([]);
  const [profiles, setProfiles] = useState([]);
  //Change input value
  const inputChange = (text) => {
    setInput(text);
  };

  const searchBtn = async () => {
    await retrieveSearch(input).then((res) => {
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
      <View style={{height: 180}}>
        <Swiper>
          {profiles !== null ? (
            profiles.map((profile) => {
              return (
                <View key={profile.id}>
                  <ProfileCard username={profile.username} bio={'Soy un cacahuate'}/>
                </View>
              );
            })
          ) : (
            <Text>Nothing to see here</Text>
          )}
        </Swiper>
      </View>
      <View style={{height: 180}}>
        <Swiper>
          {profiles !== null ? (
            profiles.map((tweet) => {
              return (
                <View key={tweet.id}>
                  <TweetCard content={tweet.content}/>
                </View>
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

export default SeachScreen;

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
