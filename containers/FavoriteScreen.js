import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function FavoriteScreen({ favoris, setFavoris, newFavoris }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.favorite}>
      <Text style={styles.textTopFavorite}>Favorite</Text>
      <View>
        {favoris.map((fav) => {
          return <Text>{fav.id}</Text>;
        })}
      </View>
      <TouchableOpacity onPress={() => navigation.push("Book")}>
        <Text>Go to product !</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  favorite: { backgroundColor: "#EEF9FB", height: "100%" },
  textTopFavorite: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
