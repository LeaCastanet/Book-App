import React from "react";
import { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "./containers/HomeScreen";
import FavoriteScreen from "./containers/FavoriteScreen";
import BookScreen from "./containers/BookScreen";
import ReadingListScreen from "./containers/ReadingListScreen";
// import SignIn from "./containers/SignIn";
// import SignUp from "./containers/SignUp";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [favoris, setFavoris] = useState([]);
  const newFavoris = [...favoris];

  const [readingList, setReadingList] = useState([]);
  const newReadingList = [...readingList];

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  useEffect(() => {
    const checkIfATokenExist = async () => {
      const userToken = await AsyncStorage.getItem("userToken");

      setUserToken(userToken);

      setIsLoading(false);
    };

    checkIfATokenExist();
  }, []);

  if (isLoading === true) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {userToken === null ? (
          <>
            <Stack.Screen name="SignUp">
              {() => <SignUp setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignIn">
              {() => <SignIn setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : () */}
        <Stack.Screen name="Tab" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#74D2EB",
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
                      options={{
                        headerShown: false,
                      }}
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
                      options={{
                        headerShown: false,
                      }}
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
                      options={{
                        headerShown: false,
                      }}
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
                      options={{
                        headerShown: false,
                      }}
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
                      options={{
                        headerShown: false,
                      }}
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
                      options={{
                        headerShown: false,
                      }}
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
