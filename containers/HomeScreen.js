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
import { ActivityIndicator } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function HomeScreen({
  favoris,
  setFavoris,
  newFavoris,
  readingList,
  setReadingList,
  newReadingList,
}) {
  const navigation = useNavigation();

  const [search, setSearch] = useState("Search here");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40`
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
    <SafeAreaView style={styles.home}>
      <ScrollView style={styles.container}>
        <View>
          <Text>Search</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search here"
        />
        <View>
          {data.map((book) => {
            if (book.volumeInfo.authors) {
              if (book.volumeInfo.imageLinks) {
                return (
                  <View key={book.id} style={styles.bookCard}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Book", { id: book.id })
                      }
                      style={styles.bookInfos}
                    >
                      <Image
                        source={{
                          uri: book.volumeInfo.imageLinks.smallThumbnail,
                        }}
                        style={styles.img}
                      ></Image>
                      <View style={styles.textContainer}>
                        <Text style={styles.bookTitle}>
                          {book.volumeInfo.title}
                        </Text>
                        <Text style={styles.bookText}>
                          Author(s): {book.volumeInfo.authors.join(", ")}
                        </Text>
                        <Text style={styles.bookText}>
                          Release: {book.volumeInfo.publishedDate}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          let isPresent = false;
                          for (let i = 0; i < newFavoris.length; i++) {
                            if (newFavoris[i].id === book.id) {
                              isPresent = true;
                            }
                          }
                          if (isPresent === true) {
                            setFavoris(
                              favoris.filter((id) => id.id !== book.id)
                            );
                          } else {
                            newFavoris.push({
                              img: book.volumeInfo.imageLinks.smallThumbnail,
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setFavoris(newFavoris);
                          }
                        }}
                      >
                        {favoris.find((id) => id.id === book.id) ? (
                          <AntDesign name="heart" size={30} color="black" />
                        ) : (
                          <AntDesign name="hearto" size={30} color="black" />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          let isPresent = false;
                          for (let i = 0; i < newReadingList.length; i++) {
                            if (newReadingList[i].id === book.id) {
                              isPresent = true;
                            }
                          }
                          if (isPresent === true) {
                            setReadingList(
                              readingList.filter((id) => id.id !== book.id)
                            );
                          } else {
                            newReadingList.push({
                              img: book.volumeInfo.imageLinks.smallThumbnail,
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setReadingList(newReadingList);
                          }
                        }}
                      >
                        {readingList.find((id) => id.id === book.id) ? (
                          <FontAwesome5 name="book" size={30} color="red" />
                        ) : (
                          <FontAwesome5 name="book" size={30} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={book.id} style={styles.bookCard}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Book", { id: book.id })
                      }
                      style={styles.bookInfos}
                    >
                      <Image
                        source={require("../assets/coverNotAvailable.jpg")}
                        style={styles.img}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.bookTitle}>
                          {book.volumeInfo.title}
                        </Text>
                        <Text style={styles.bookText}>
                          Author(s): {book.volumeInfo.authors.join(", ")}
                        </Text>
                        <Text style={styles.bookText}>
                          Release: {book.volumeInfo.publishedDate}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          let isPresent = false;
                          for (let i = 0; i < newFavoris.length; i++) {
                            if (newFavoris[i].id === book.id) {
                              isPresent = true;
                            }
                          }
                          if (isPresent === true) {
                            setFavoris(
                              favoris.filter((id) => id.id !== book.id)
                            );
                          } else {
                            newFavoris.push({
                              img: "../assets/coverNotAvailable.jpg",
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setFavoris(newFavoris);
                          }
                        }}
                      >
                        {favoris.find((id) => id.id === book.id) ? (
                          <AntDesign name="heart" size={30} color="black" />
                        ) : (
                          <AntDesign name="hearto" size={30} color="black" />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          let isPresent = false;
                          for (let i = 0; i < newReadingList.length; i++) {
                            if (newReadingList[i].id === book.id) {
                              isPresent = true;
                            }
                          }
                          if (isPresent === true) {
                            setReadingList(
                              readingList.filter((id) => id.id !== book.id)
                            );
                          } else {
                            newReadingList.push({
                              img: "../assets/coverNotAvailable.jpg",
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setReadingList(newReadingList);
                          }
                        }}
                      >
                        {readingList.find((id) => id.id === book.id) ? (
                          <FontAwesome5 name="book" size={30} color="red" />
                        ) : (
                          <FontAwesome5 name="book" size={30} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            } else {
              if (book.volumeInfo.imageLinks) {
                return (
                  <View key={book.id} style={styles.bookCard}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Book", { id: book.id })
                      }
                      style={styles.bookInfos}
                    >
                      <Image
                        source={{
                          uri: book.volumeInfo.imageLinks.smallThumbnail,
                        }}
                        style={styles.img}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.bookTitle}>
                          {book.volumeInfo.title}
                        </Text>
                        <Text style={styles.bookText}>
                          Release: {book.volumeInfo.publishedDate}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          let isPresent = false;
                          for (let i = 0; i < newFavoris.length; i++) {
                            if (newFavoris[i].id === book.id) {
                              isPresent = true;
                            }
                          }
                          if (isPresent === true) {
                            setFavoris(
                              favoris.filter((id) => id.id !== book.id)
                            );
                          } else {
                            newFavoris.push({
                              img: book.volumeInfo.imageLinks.smallThumbnail,
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setFavoris(newFavoris);
                          }
                        }}
                      >
                        {favoris.find((id) => id.id === book.id) ? (
                          <AntDesign name="heart" size={30} color="black" />
                        ) : (
                          <AntDesign name="hearto" size={30} color="black" />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          let isPresent = false;
                          for (let i = 0; i < newReadingList.length; i++) {
                            if (newReadingList[i].id === book.id) {
                              isPresent = true;
                            }
                          }
                          if (isPresent === true) {
                            setReadingList(
                              readingList.filter((id) => id.id !== book.id)
                            );
                          } else {
                            newReadingList.push({
                              img: book.volumeInfo.imageLinks.smallThumbnail,
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setReadingList(newReadingList);
                          }
                        }}
                      >
                        {readingList.find((id) => id.id === book.id) ? (
                          <FontAwesome5 name="book" size={30} color="red" />
                        ) : (
                          <FontAwesome5 name="book" size={30} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={book.id} style={styles.bookCard}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Book", { id: book.id })
                      }
                      style={styles.bookInfos}
                    >
                      <Image
                        source={require("../assets/coverNotAvailable.jpg")}
                        style={styles.img}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.bookTitle}>
                          {book.volumeInfo.title}
                        </Text>
                        <Text style={styles.bookText}>
                          Release: {book.volumeInfo.publishedDate}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          let isPresent = false;
                          for (let i = 0; i < newFavoris.length; i++) {
                            if (newFavoris[i].id === book.id) {
                              isPresent = true;
                            }
                          }
                          if (isPresent === true) {
                            setFavoris(
                              favoris.filter((id) => id.id !== book.id)
                            );
                          } else {
                            newFavoris.push({
                              img: "../assets/coverNotAvailable.jpg",
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setFavoris(newFavoris);
                          }
                        }}
                      >
                        {favoris.find((id) => id.id === book.id) ? (
                          <AntDesign name="heart" size={30} color="black" />
                        ) : (
                          <AntDesign name="hearto" size={30} color="black" />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          let isPresent = false;
                          for (let i = 0; i < newReadingList.length; i++) {
                            if (newReadingList[i].id === book.id) {
                              isPresent = true;
                            }
                          }
                          if (isPresent === true) {
                            setReadingList(
                              readingList.filter((id) => id.id !== book.id)
                            );
                          } else {
                            newReadingList.push({
                              img: "../assets/coverNotAvailable.jpg",
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setReadingList(newReadingList);
                          }
                        }}
                      >
                        {readingList.find((id) => id.id === book.id) ? (
                          <FontAwesome5 name="book" size={30} color="red" />
                        ) : (
                          <FontAwesome5 name="book" size={30} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //home: { backgroundColor: "white" },
  container: { margin: 10 },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    borderColor: "white",
    backgroundColor: "white",
  },
  bookCard: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    padding: 10,
    width: "100%",
  },
  bookInfos: { flexDirection: "row", flex: 8 },
  img: {
    height: 200,
    flex: 1,
    borderRadius: 10,
  },
  bookTitle: { textAlign: "justify", marginBottom: 10 },
  bookText: { textAlign: "justify", marginBottom: 10 },
  textContainer: { flex: 2, marginLeft: 10 },
  buttonsContainer: {
    //backgroundColor: "green",
    position: "absolute",
    flexDirection: "row",
    marginLeft: "80%",
    marginTop: 175,
    width: 100,
    justifyContent: "space-between",
  },
  btn: {},
});
