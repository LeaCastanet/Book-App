import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import coverNotAvailable from "../assets/coverNotAvailable.jpg";
import listImg from "../assets/listImg.jpg";

export default function ReadingListScreen({
  readingList,
  setReadingList,
  newReadingList,
}) {
  const navigation = useNavigation();

  return readingList.length < 1 ? (
    <SafeAreaView style={styles.readingList}>
      <Text style={styles.textTopReadingList}>Reading List</Text>
      <Image style={styles.listImg} source={listImg}></Image>
      <Text style={styles.textTopReadingList}>
        No books on your reading list
      </Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.readingList}>
      <ScrollView>
        <Text style={styles.textTopReadingList}>Reading List</Text>
        <View style={styles.bookCardContainer}>
          {readingList.map((book) => {
            if (book.img === coverNotAvailable) {
              return (
                <TouchableOpacity
                  style={styles.bookContainer}
                  onPress={() => navigation.push("Book", { id: book.id })}
                >
                  <Image style={styles.img} source={coverNotAvailable}></Image>
                  <Text style={styles.title}>{book.title}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  style={styles.bookContainer}
                  onPress={() => navigation.push("Book", { id: book.id })}
                >
                  <Image
                    style={styles.img}
                    source={{
                      uri: book.img,
                    }}
                  ></Image>
                  <Text style={styles.title}>{book.title}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  readingList: { backgroundColor: "#EEF9FB", height: "100%" },
  listImg: { height: "60%", width: "100%", marginTop: 80 },
  textTopReadingList: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  bookCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  bookContainer: {
    width: "47%",
    margin: 5,
    alignContent: "space-between",
    marginBottom: 15,
  },
  img: { height: 320, width: "100%", borderRadius: 10 },
  title: { textAlign: "center", fontWeight: "bold", fontSize: 17 },
});
