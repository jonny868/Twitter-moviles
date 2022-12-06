import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GlobalHeader from "../components/GlobalHeader";
import TweetCard from "../components/TweetCard";
import moment from "moment/moment";
import { Context } from "../controllers/context";
import { addNewComment, retrieveComments } from "../controllers/api";
import CommentCard from "../components/CommentCard";

const TweetScreen = () => {
  const { tweetData, user, reload, setReload } = useContext(Context);
 
  const [loading,setLoading] = useState(false);

  const [comment, setComment] = useState({
    tweetId: tweetData.id,
    userId: user.id,
    username: user.username,
    content: "",
  });
  const [comments, setComments] = useState([
    {
      content: "",
      userId: "",
      username: "",
      date: "",
      id: "",
    },
  ]);
  useEffect(() => {
    setLoading(true)
    retrieveComments(tweetData.id).then((res) => {
      setComments(res);
      // setReload(false);
      console.log(comments)
    });
    setLoading(false)
  }, [reload]);

  const submitBtn = () => {
    const res = addNewComment(comment);
    retrieveComments(tweetData.id);

    setComment({
      tweetId: tweetData.id,
      userId: user.id,
      username: user.username,
      content: "",
    });
    setReload(!reload)
  };
  const test = () => {
    return (
      <Text>Hello</Text>
    )
  };

  const inputChange = (data) => setComment({ ...comment, content: data });

  const formatDate = (date) => moment(date,'LLL').fromNow();

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
  const renderComent = ({item})=>{
  
  return(
    <CommentCard
    content={item.content}
    date={formatDate(item.date)}
    username={item.username}
    userId={item.userId}
    id={item.id}
    tweetId={tweetData.id}
    />
  )
}






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
          {/* <TouchableOpacity onPress={test}>
            <Text>TEST</Text>
          </TouchableOpacity> */}
          <View>
            {loading ? <ActivityIndicator/>:
            <FlatList
            data={comments}
            keyExtractor={com =>com.id}
            renderItem={renderComent}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{height:410}}
            />
            }
          </View>
            
          
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
    // paddingBottom: 500
    // backgroundColor: 'red'
  },
});
