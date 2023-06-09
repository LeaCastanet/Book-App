import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function ReadingListScreen({
  readingList,
  setReadingList,
  newReadingList,
}) {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Reading List</Text>
      <View>
        {readingList.map((book) => {
          return <Text>{book.id}</Text>;
        })}
      </View>
      <TouchableOpacity onPress={() => navigation.push("Book")}>
        <Text>Go to product !</Text>
      </TouchableOpacity>
    </View>
  );
}
