import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.newTweetBtn} onPress={() => {
         navigation.navigate('NewTweet') 
        }}>
            <View>
            <FontAwesome5 name="plus" size={24} color="white" />
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    newTweetBtn:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#f4511e',
        padding: 30,
        borderRadius: 50
    }



})