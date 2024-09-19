import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function HabitCreatedScreen() {
  const Navigation = useNavigation<any>();
  return (
    <View style={styles.rootContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Habit created!</Text>

        <View style={styles.imagePlaceholder}>
          <Image
            source={{
              uri: "https://archive.org/download/placeholder-image/placeholder-image.jpg",
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>Spaces</Text>
          <Text style={styles.description} numberOfLines={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", width: "80%" }}>
        <TouchableOpacity
          style={styles.createSpaceButton}
          onPress={() => Navigation.navigate("Main Screen")}
        >
          <Text style={styles.buttonText}>Create a space</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.maybeLaterButton}
          onPress={() => Navigation.navigate("Main Screen")}
        >
          <Text style={styles.maybeLaterText}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topContainer: {
    // flex: 1,
    // justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 20,
    // zIndex : 10
  },
  imagePlaceholder: {
    width: 400,
    height: 200,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    // borderWidth : 2,
    overflow: "hidden",
  },
  image: {
    width: 500,
    height: 300,
    resizeMode: "cover",
    // zIndex : 0
  },
  descriptionContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    color: "#666",
    fontWeight: "400",
  },
  createSpaceButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "center",
  },
  maybeLaterButton: {
    paddingVertical: 10,
    alignSelf: "center",
  },
  maybeLaterText: {
    fontSize: 16,
    color: "#666",
  },
});
