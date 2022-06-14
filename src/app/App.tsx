import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AuthPage } from "app/pages/AuthPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LobbyPage from "./pages/Lobby";
import { StoreProvider } from "./store";

const Stack = createNativeStackNavigator();
const Navigator = Stack.Navigator as any;

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Navigator>
          <Stack.Screen name="Lobby" component={LobbyPage} />
          <Stack.Screen name="Auth" component={AuthPage} />
        </Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

// <View style={styles.container}>
//   <AuthPage />
//   <StatusBar style="auto" />
// </View>
export default App;
