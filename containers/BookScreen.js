import { Text, View, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookScreen() {
  const route = useRoute();
  const id = route.params.id;

  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      setBook(response.data.volumeInfo);
      setIsLoading(false);
      // console.log(response.data.items);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color="#ec5a62"
      style={{ marginTop: 100 }}
    />
  ) : (
    <View>
      <Text>{book.title}</Text>
    </View>
  );
}
