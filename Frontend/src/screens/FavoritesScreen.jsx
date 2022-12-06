import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import GlobalHeader from '../components/GlobalHeader'

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <GlobalHeader name="Favorites" hasProfilePic hasBack/>
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    }
})