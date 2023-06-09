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

export default function HomeScreen({ favoris, setFavoris, newFavoris }) {
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
      <ScrollView>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search here"
        />
        <View>
          {data.map((book) => {
            return (
              <View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Book", { id: book.id })}
                  >
                    <Image
                      source={{
                        uri: book.volumeInfo.imageLinks.smallThumbnail,
                      }}
                      style={styles.img}
                    />
                    <Text key={book.id}>{book.volumeInfo.title}</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      console.log("pressed !");
                    }}
                  >
                    <Text style={styles.btnText}>Favorite</Text>
                  </TouchableOpacity>
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
                        setFavoris(favoris.filter((id) => id.id !== book.id));
                      } else {
                        newFavoris.push({
                          //img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                          title: book.volumeInfo.title,
                          id: book.id,
                        });
                        setFavoris(newFavoris);
                      }
                    }}
                  >
                    <Text style={styles.btnText}>Reading List</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
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
  img: {
    height: 50,
    width: 50,
  },
});
