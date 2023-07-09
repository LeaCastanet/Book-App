import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import coverNotAvailable from "../assets/coverNotAvailable.jpg";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

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
    <SafeAreaView style={styles.bookPage}>
      <ActivityIndicator
        size="large"
        color="#74D2EB"
        style={{ marginTop: 100 }}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.bookPage}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            source={
              book.imageLinks
                ? { uri: book.imageLinks.smallThumbnail }
                : coverNotAvailable
            }
            style={styles.img}
          ></Image>
          <Text>{book.title}</Text>
          <View>
            {/* A faire reagir en fonction de si dans fav ou reading list après avoir fait le back */}
            <AntDesign name="hearto" size={30} color="black" />
            <FontAwesome5 name="book" size={30} />
          </View>
        </View>

        <View style={styles.bookInfoContainer}>
          <View>
            <Text>Author :</Text>
            <Text>{book.authors}</Text>
          </View>
          <View>
            <Text>publisher :</Text>
            <Text>{book.publisher}</Text>
          </View>
          <View>
            <Text>Release :</Text>
            <Text>{book.publishedDate}</Text>
          </View>
          <View>
            <Text></Text>
            <Text>{book.description}</Text>
          </View>
          <View>
            <Text>Reader reviews :</Text>
            <Text>{book.averageRating}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bookPage: { backgroundColor: "#EEF9FB", height: "100%" },
  imgContainer: { alignItems: "center", marginTop: 20 },
  img: { height: 300, width: 190, borderRadius: 10 },
  bookInfoContainer: { marginTop: 20 },
});
