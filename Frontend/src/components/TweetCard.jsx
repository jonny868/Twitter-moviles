import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TweetCard = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.content}asdasd</Text>
    </View>
  )
}

export default TweetCard

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 200,
        backgroundColor: "red"
    }
})