import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function FavoriteScreen({ favoris, setFavoris, newFavoris }) {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Favorite</Text>
      <View>
        {favoris.map((fav) => {
          return <Text>{fav.id}</Text>;
        })}
      </View>
      <TouchableOpacity onPress={() => navigation.push("Book")}>
        <Text>Go to product !</Text>
      </TouchableOpacity>
    </View>
  );
}
