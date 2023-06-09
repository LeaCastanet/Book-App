import React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "./containers/HomeScreen";
import FavoriteScreen from "./containers/FavoriteScreen";
import BookScreen from "./containers/BookScreen";
import ReadingListScreen from "./containers/ReadingListScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [favoris, setFavoris] = useState([]);
  const newFavoris = [...favoris];

  const [readingList, setReadingList] = useState([]);
  const newReadingList = [...readingList];
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tab" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
              }}
            >
              <Tab.Screen
                name="TabHome"
                options={{
                  tabBarLabel: "Home",
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="home" size={size} color={color} />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Explore"
                      //options={{
                      // header: (props) => <CustomHeader {...props} />,
                      // }}
                    >
                      {() => (
                        <HomeScreen
                          favoris={favoris}
                          setFavoris={setFavoris}
                          newFavoris={newFavoris}
                          readingList={readingList}
                          setReadingList={setReadingList}
                          newReadingList={newReadingList}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen
                      name="Book"
                      //options={{
                      //header: (props) => <CustomHeader {...props} />,
                      // }}
                    >
                      {() => <BookScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>

              <Tab.Screen
                name="TabFavorite"
                options={{
                  tabBarLabel: "Favorite",
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <AntDesign name="heart" size={size} color={color} />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Favorite"
                      //options={{
                      // header: (props) => <CustomHeader {...props} />,
                      // }}
                    >
                      {() => (
                        <FavoriteScreen
                          favoris={favoris}
                          setFavoris={setFavoris}
                          newFavoris={newFavoris}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen
                      name="Book"
                      //options={{
                      //header: (props) => <CustomHeader {...props} />,
                      // }}
                    >
                      {() => <BookScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>

              <Tab.Screen
                name="TabReadingList"
                options={{
                  tabBarLabel: "Reading List",
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="book" size={size} color={color} />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Reading List"
                      //options={{
                      // header: (props) => <CustomHeader {...props} />,
                      // }}
                    >
                      {() => (
                        <ReadingListScreen
                          readingList={readingList}
                          setReadingList={setReadingList}
                          newReadingList={newReadingList}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen
                      name="Book"
                      //options={{
                      //header: (props) => <CustomHeader {...props} />,
                      // }}
                    >
                      {() => <BookScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
