import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Context } from "../controllers/context";
import GlobalHeader from "../components/GlobalHeader";

const ProfileScreen = () => {
  const { user, setUser } = useContext(Context);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <GlobalHeader hasProfilePic name="Profile" hasBack />
        {/*CONTENT */}
        <View style={styles.card}>
          <TouchableOpacity onPress={()=>console.log('open image selector')}>
            <Image
              style={{
                width: 300,
                height: 300,
                alignSelf: "center",
                borderRadius: 300,
              }}
              source={{ uri: user.profilePicture }}
            />
          </TouchableOpacity>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={user.username}
            editable={false}
          />

          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="asdasd" />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            editable={false}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input} placeholder="asdasd" />

          <Text style={styles.label}>DOB</Text>
          <TextInput style={styles.input} value={user.dob} placeholder="asdasd" />

          <Text style={styles.label}>Bio</Text>
          <TextInput style={[styles.input,{ height: 100, textAlignVertical:"top", paddingVertical: 4 }]} value={user.bio} maxLength={140} multiline numberOfLines={3} />

          <TouchableOpacity>
            <View style={styles.updateBtn}>
                <Text style={{color: "#fff"}}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  card: {
    paddingTop: 20,
    marginTop: 10,
    width: 380,
    height: 900,
    backgroundColor: "#f4511e",
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 10,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  label: {
    color: "#eee",
    fontWeight: "bold",
    fontSize: 15,
    paddingHorizontal: 10,
  },
  updateBtn:{
    borderRadius: 5,
    borderWidth: 3,
    height:40,
    width: 120,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eee',
  }
});
