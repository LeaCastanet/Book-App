import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import coverNotAvailable from "../assets/coverNotAvailable.jpg";
import favImg from "../assets/favImg.jpg";

export default function FavoriteScreen({ favoris, setFavoris, newFavoris }) {
  const navigation = useNavigation();

  return favoris.length < 1 ? (
    <SafeAreaView style={styles.favorite}>
      <Text style={styles.textTopFavorite}>Favorite</Text>
      <Image style={styles.favImg} source={favImg}></Image>
      <Text style={styles.textTopFavorite}>No favorites at this time</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.favorite}>
      <ScrollView>
        <Text style={styles.textTopFavorite}>Favorite</Text>
        <View style={styles.bookCardContainer}>
          {favoris.map((fav) => {
            if (fav.img === coverNotAvailable) {
              return (
                <TouchableOpacity
                  style={styles.bookContainer}
                  onPress={() => navigation.push("Book", { id: fav.id })}
                >
                  <Image style={styles.img} source={coverNotAvailable}></Image>
                  <Text style={styles.title}>{fav.title}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  style={styles.bookContainer}
                  onPress={() => navigation.push("Book", { id: fav.id })}
                >
                  <Image
                    style={styles.img}
                    source={{
                      uri: fav.img,
                    }}
                  ></Image>
                  <Text style={styles.title}>{fav.title}</Text>
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
  favorite: { backgroundColor: "#EEF9FB", height: "100%" },
  favImg: { height: "60%", width: "100%", marginTop: 80 },
  textTopFavorite: {
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
