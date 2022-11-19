import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { loginUser } from '../controllers/api'

export default function LoginScreen() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  const loginBtn = async () => {
    const res = await loginUser(inputs)
    console.log(res)
  }

  const inputChange = (name, data) => setInputs({...inputs, [name]: data})
  return (
    <View>
      <TextInput
      value={inputs.username}
      onChangeText={(text) => {
       inputChange('username', text) 
      }}
      placeholder='username'
      />
      <TextInput
      value={inputs.password}
      onChangeText={(text) => {
       inputChange('password', text) 
      }}
      placeholder='password'
      secureTextEntry
      />
      <TouchableOpacity onPress={()=>loginBtn()}>
        <View>
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})