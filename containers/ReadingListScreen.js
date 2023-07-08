import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
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
      <Text style={styles.textTopReadingList}>Reading List</Text>
      <View>
        {readingList.map((book) => {
          return <Text>{book.id}</Text>;
        })}
      </View>
      <TouchableOpacity onPress={() => navigation.push("Book")}>
        <Text>Go to product !</Text>
      </TouchableOpacity>
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
});
