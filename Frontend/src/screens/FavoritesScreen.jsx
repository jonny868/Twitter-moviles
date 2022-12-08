import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useContext, useEffect } from 'react'
import GlobalHeader from '../components/GlobalHeader'
import { Context } from '../controllers/context'
import { retrieveFavorites } from '../controllers/api'

const FavoritesScreen = () => {
  const {user} = useContext(Context)
  
  useEffect(()=>{
    retrieveFavorites(user.id)
  },[])
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