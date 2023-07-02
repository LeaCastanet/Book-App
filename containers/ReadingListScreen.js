import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function ReadingListScreen({
  readingList,
  setReadingList,
  newReadingList,
}) {
  const navigation = useNavigation();

  return (
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
  textTopReadingList: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
