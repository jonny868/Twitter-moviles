import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GlobalHeader from "../components/GlobalHeader";
import TweetCard from "../components/TweetCard";
import moment from "moment/moment";
import { Context } from "../controllers/context";
import { addNewComment, retrieveComments } from "../controllers/api";

const TweetScreen = () => {
  const { tweetData, user } = useContext(Context);

  const [comment, setComment] = useState({
    tweetId: tweetData.id,
    userId: user.id,
    username: user.username,
    content: "",
  });
  const [comments, setComments] = useState()
let res
  // useEffect(async () => {
  //   res = await retrieveComments(tweetData.id)
  //     setComments(res)
  //     console.log('Comentarios:',comments)
  //   }, [])
  

  const submitBtn = () => {
    const res = addNewComment(comment);
    retrieveComments(tweetData.id);

    setComment({
      tweetId: tweetData.id,
      userId: user.id,
      username: user.username,
      content: "",
    });
  };

  const inputChange = (data) => setComment({ ...comment, content: data });

  const checkAuthority = (tweet, userId) => {
    if (tweetData.userId === userId) {
      return (
        <TweetCard
          isAuthor
          username={tweetData.owner}
          date={`${moment(tweetData.date).fromNow()} ago`}
          content={tweetData.content}
          tweetId={tweetData.id}
        />
      );
    } else {
      return (
        <TweetCard
          username={tweetData.owner}
          date={`${moment(tweetData.date).fromNow()} ago`}
          content={tweetData.content}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <GlobalHeader name={"Tweet"} hasBack />
      {checkAuthority(tweetData.userId, user.id)}
      <View>
        <Text>Comments:</Text>
        <View>
          <TextInput
            placeholder="Add a comment..."
            value={comment.content}
            onChangeText={(text) => inputChange(text)}
          />
          <TouchableOpacity
            onPress={() => {
              submitBtn();
            }}
          >
            <View style={styles.submitBtn}>
              <Text>Submit</Text>
            </View>
          </TouchableOpacity>
{/* 
          {comments !== null ?
            comments.map((com) => (
              `${console.log(com)}`
              )
            )
: null} */}
        </View>
      </View>
    </View>
  );
};

export default TweetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    // backgroundColor: 'red'
  },
});
