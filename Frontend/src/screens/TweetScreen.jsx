import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import GlobalHeader from '../components/GlobalHeader';
import TweetCard from '../components/TweetCard';
import moment from 'moment/moment';
import { Context } from '../controllers/context';

const TweetScreen = () => {
  const {tweetData, user} = useContext(Context)

  const [comment, setComment] = useState({
    userId: user.id,
    username: user.username,
    comment:''
  })



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
        <GlobalHeader name={'Tweet'} hasBack/>
      {checkAuthority(tweetData.userId, user.id)}
      <View>
        <Text>Comments:</Text>
        <View>
          <TextInput placeholder='Add a comment...'/>
          <TouchableOpacity>
            <View style={styles.submitBtn}>
              <Text>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default TweetScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    }
})