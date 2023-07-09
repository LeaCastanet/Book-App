import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function SignUp({}) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassord] = useState("");

  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setError("");
      if (
        !email ||
        !username ||
        !password ||
        !confirmPassword ||
        !description
      ) {
        setError("Please complete all mandatory fields");
        return;
      }

      // 2 FRONT Vérifier que les mdp sont identiques
      if (password !== confirmPassword) {
        setError("Your two passwords are different");
        return;
      }

      console.log("before request");
      //   const response = await axios.post("", {
      //     email: email,
      //     username: username,
      //     password: password,
      //   });

      // console.log(response.data);

      setToken(response.data.token);
      alert("connected");
    } catch (error) {
      console.log(error.response.status);

      const message = error.response.data.error;
      console.log(message);

      if (
        message === "This username already has an account." ||
        message === "This email already has an account."
      ) {
        setError(message);
      }
    }
  };
  return (
    <SafeAreaView>
      <Image></Image>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Your Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Your Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Your password"
          onChangeText={(text) => setConfirmPassord(text)}
          value={confirmPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <Text>{error}</Text>
        <TouchableOpacity style={styles.btnSubmit} onPress={submit}>
          <Text>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSingIn}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
