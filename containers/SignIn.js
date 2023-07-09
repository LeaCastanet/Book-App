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
} from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function SignIn({}) {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <Text>Username</Text>
        <TextInput placeholder="Username" />
        <Text>Password: </Text>
        <TextInput placeholder="Password" secureTextEntry={true} />
      </View>
      <View>
        <TouchableOpacity>
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
