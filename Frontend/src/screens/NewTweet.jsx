import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { addNewTweet } from "../controllers/api";
import { Context } from "../controllers/context";
import GlobalHeader from "../components/GlobalHeader";
import { useNavigation, useRoute } from "@react-navigation/native";

const NewTweet = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { user } = useContext(Context);

  const [content, setContent] = useState("");

  const submitBtn = () => {
    addNewTweet({
      userId: user.id,
      content: content,
      owner: user.username,
    });
    // console.log(content)
    console.log(route.params)
    setContent("");

    navigation.navigate('Home');
  };

  const inputChange = (data) => {
    setContent(data);
  };

  return (
    <View style={styles.container}>
      <GlobalHeader name="New Tweet" hasBack />
      <TextInput
        onChangeText={(text) => inputChange(text)}
        value={route.params?route.params.tweetData.content :content}
        editable={route.params?false:true}
        placeholder="Say something..."
        maxLength={140}
        multiline={true}
      />
      <TouchableOpacity onPress={() => submitBtn()}>
        <View>
          <Text>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NewTweet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
