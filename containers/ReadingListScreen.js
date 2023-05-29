import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function ReadingListScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Reading List</Text>
      <TouchableOpacity onPress={() => navigation.push("Book")}>
        <Text>Go to product !</Text>
      </TouchableOpacity>
    </View>
  );
}
