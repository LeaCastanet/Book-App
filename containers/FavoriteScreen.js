import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import coverNotAvailable from "../assets/coverNotAvailable.jpg";

export default function FavoriteScreen({ favoris, setFavoris, newFavoris }) {
  const navigation = useNavigation();

  return favoris.length < 1 ? (
    <SafeAreaView style={styles.favorite}>
      <Text style={styles.textTopFavorite}>Favorite</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.favorite}>
      <Text style={styles.textTopFavorite}>Favorite</Text>
      <View>
        {favoris.map((fav) => {
          if (fav.img === "../assets/coverNotAvailable.jpg") {
            return (
              <View style={styles.bookCardContainer}>
                <View>
                  <Image style={styles.img} source={coverNotAvailable}></Image>
                  <Text>{fav.title}</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.bookCardContainer}>
                <View>
                  <Image
                    style={styles.img}
                    source={{
                      uri: fav.img,
                    }}
                  ></Image>
                  <Text>{fav.title}</Text>
                </View>
              </View>
            );
          }
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
  bookCardContainer: { flexDirection: "row" },
  img: { height: 100, width: 50 },
});
