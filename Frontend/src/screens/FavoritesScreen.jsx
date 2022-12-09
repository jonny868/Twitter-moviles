import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GlobalHeader from "../components/GlobalHeader";
import { Context } from "../controllers/context";
import { formatDate, retrieveFavorites } from "../controllers/api";
import TweetCard from "../components/TweetCard";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState();
  const [loading, setLoading] = useState(false);
  const { user, reload } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    retrieveFavorites(user.id).then((res) => {
      setFavorites(res);
    });
    setLoading(false);
  }, [reload]);

  //test data
  // const data = [{ name: "john" }, { name: "juan" }];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item.id);
        }}
      >
        <TweetCard
          content={item.content}
          username={item.owner}
          tweetId={item.id}
          tweetLikes={item.likesCount}
          date={formatDate(item.date)}
          isFaved={true}
          isAuthor={item.userId === user.id?true:false}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <GlobalHeader name="Favorites" hasProfilePic hasBack />
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(ft) => ft.id}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ height: 100 }}
          />
        )}
      </View>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
