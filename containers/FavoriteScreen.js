import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Favorite</Text>
      <TouchableOpacity onPress={() => navigation.push("Book")}>
        <Text>Go to product !</Text>
      </TouchableOpacity>
    </View>
  );
}
