import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { deleteTweetById, likeATweet } from "../controllers/api";
import { Context } from "../controllers/context";
import { useNavigation } from "@react-navigation/native";

const TweetCard = (props) => {
  const navigation = useNavigation();
  const { setReload, reload, setTweetData, tweetData } = useContext(Context);
  const [likeTweet, setLikeTweet] = useState(false)
 

  const deleteTweet = async (id) => {
    const res = await deleteTweetById(id);
    console.log(reload);
    if (res.data.status === 200) {
      if (reload === true) {
        console.log(reload);
        setReload(false);
      } else {
        setReload(true);
      }
    }
  };
  const likeBtn = ()=>{
    setLikeTweet(!likeTweet)
    likeATweet(likeTweet, tweetData.id, tweetData.userId)
    
  }

  

  
  return (
    <View style={styles.container}>
      {/* PROFILE PIC */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              alignSelf: "center",
              marginTop: 25,
            }}
            source={{
              uri:
                props.profilePic ||
                "https://res.cloudinary.com/dqwbl8iq2/image/upload/v1668872408/default-profile-pic-e1513291410505_svzzt5.jpg",
            }}
          />
        </TouchableOpacity>
      </View>
      {/* TWEET */}
      <View
        style={{
          flex: 3,
          backgroundColor: "#333",
          justifyContent: "center",
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        {/* USERNAME AND TIME AGO */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: 50,
            justifyContent: "space-between",
            backgroundColor: "#444",
            alignContent: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ color: "#eee", alignSelf: "center" }}>
            @{props.username}
          </Text>
          <Text style={{ color: "#eee", alignSelf: "center" }}>
            {props.date}
          </Text>
        </View>
        {/* CONTENT */}
        <View style={{ flex: 2 }}>
          <Text style={{ color: "#eee" }}>{props.content}</Text>
        </View>
        {/* BUTTONS */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            paddingBottom: -5,
            backgroundColor: "black",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={likeBtn}>
            {
              likeTweet ?<View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color:'white', paddingRight: 5, fontSize:15}}>2</Text>
                <AntDesign name="hearto" color="white" size={15} /></View>:  <AntDesign name="heart" color="white" size={15} />
              
            }
          </TouchableOpacity>
          <AntDesign name="retweet" size={15} color="white" />
          <AntDesign name="staro" size={15} color="white" />
          {props.isAuthor === true ? (
            <TouchableWithoutFeedback
              onPress={() => {
                deleteTweet(props.tweetId);
              }}
            >
              <AntDesign name="delete" size={15} color="white" />
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default TweetCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: 350,
    alignSelf: "center",
    height: 150,
    backgroundColor: "#f4511e",
    flexDirection: "row",
    marginVertical: 5,
  },
});
