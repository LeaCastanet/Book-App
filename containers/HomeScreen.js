import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [search, setSearch] = useState("Search Here");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}`
      );
      setData(response.data.items);
      setIsLoading(false);
      // console.log(response.data.items);
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color="#ec5a62"
      style={{ marginTop: 100 }}
    />
  ) : (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        value={search}
        placeholder="Search here"
      />
      <TouchableOpacity onPress={() => navigation.push("Book")}>
        <Text>Go to product !</Text>
      </TouchableOpacity>
      <Text>
        {data.map((book) => {
          return <Text key={book.id}>{book.volumeInfo.title}</Text>;
        })}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});
