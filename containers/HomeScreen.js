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

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import homeImg from "../assets/homeImg.jpg";
import coverNotAvailable from "../assets/coverNotAvailable.jpg";

export default function HomeScreen({
  favoris,
  setFavoris,
  newFavoris,
  readingList,
  setReadingList,
  newReadingList,
}) {
  const navigation = useNavigation();

  const [search, setSearch] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const submit = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40`
    );
    setData(response.data.items);
    setIsLoading(false);
    // console.log(response.data.items);
  };

  return isLoading ? (
    <SafeAreaView style={styles.home}>
      <View>
        <Text style={styles.textTopHome}>Look for your next reading</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder="Search here"
          />
          <TouchableOpacity onPress={submit} style={styles.iconSearch}>
            <Foundation name="magnifying-glass" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Image style={styles.homeImg} source={homeImg}></Image>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.home}>
      <ScrollView style={styles.container}>
        <Text style={styles.textTopHome}>Look for your next reading</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder="Search here"
          />
          <TouchableOpacity onPress={submit}>
            <Foundation name="magnifying-glass" size={30} color="black" />
          </TouchableOpacity>
        </View>
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
                          <AntDesign name="heart" size={30} color="#74D2EB" />
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
                          <FontAwesome5 name="book" size={30} color="#74D2EB" />
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
                      <Image source={coverNotAvailable} style={styles.img} />
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
                              img: coverNotAvailable,
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setFavoris(newFavoris);
                          }
                        }}
                      >
                        {favoris.find((id) => id.id === book.id) ? (
                          <AntDesign name="heart" size={30} color="#74D2EB" />
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
                              img: coverNotAvailable,
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setReadingList(newReadingList);
                          }
                        }}
                      >
                        {readingList.find((id) => id.id === book.id) ? (
                          <FontAwesome5 name="book" size={30} color="#74D2EB" />
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
                          <AntDesign name="heart" size={30} color="#74D2EB" />
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
                          <FontAwesome5 name="book" size={30} color="#74D2EB" />
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
                      <Image source={coverNotAvailable} style={styles.img} />
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
                              img: coverNotAvailable,
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setFavoris(newFavoris);
                          }
                        }}
                      >
                        {favoris.find((id) => id.id === book.id) ? (
                          <AntDesign name="heart" size={30} color="#74D2EB" />
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
                              img: coverNotAvailable,
                              title: book.volumeInfo.title,
                              id: book.id,
                            });
                            setReadingList(newReadingList);
                          }
                        }}
                      >
                        {readingList.find((id) => id.id === book.id) ? (
                          <FontAwesome5 name="book" size={30} color="#74D2EB" />
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
  home: { backgroundColor: "#EEF9FB", height: "100%" },
  container: { marginLeft: 10, marginRight: 10 },
  textTopHome: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 9,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    borderColor: "white",
    backgroundColor: "white",
  },
  iconSearch: { flex: 0.9 },
  homeImg: { height: "60%", width: "100%", marginTop: 50 },
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
  bookTitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  bookText: { marginBottom: 10, fontSize: 16 },
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
});
