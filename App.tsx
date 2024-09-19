import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import UserInputScreen from "./src/screens/UserInputScreen";
import HabitCreatedScreen from "./src/screens/HabitCreatedScreen";

const Stack = createStackNavigator();

function Navigator() {
  return (
  
      <Stack.Navigator>
        <Stack.Screen
          name="Main Screen"
          component={UserInputScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HabitCreatedScreen"
          component={HabitCreatedScreen}
          options={{title : 'Habbit Created'}}
        />
      </Stack.Navigator>
   
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <PaperProvider>
      <Navigator />
    </PaperProvider>
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
