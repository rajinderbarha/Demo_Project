import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Checkbox } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize"; // Responsive font size
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserInputScreen() {
  const [habit, setHabit] = useState("");
  const [reason, setReason] = useState("");
  const [frequency, setFrequency] = useState("Week");
  const [frequencyDays, setfrequencyDays] = useState("");
  const [days, setDays] = useState<any>({
    S: false,
    M: false,
    T: false,
    W: false,
    Th: false,
    F: false,
    Sa: false,
  });
  const [duration, setDuration] = useState("1 week");
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions(); 

  function reset() {
    setHabit("");
    setReason("");
    setFrequency("Week");
    setfrequencyDays("");
    setDays({
      S: false,
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      Sa: false,
    });
    setDuration("1 week");
  }

  const handleDayPress = (day: string) => {
    setDays({ ...days, [day]: !days[day] });
  };

  const handleDurationPress = (period: string) => {
    setDuration(period);
  };

  const saveHabitData = async () => {
    try {
      const habitData = {
        habit,
        reason,
        frequency,
        frequencyDays,
        days,
        duration,
      };
      await AsyncStorage.setItem("habitData", JSON.stringify(habitData));
      console.log("Data saved successfully!", habitData);
    } catch (error) {
      console.log("Error saving data", error);
    }
  };


    const createHabitHandler = async () => {
      // Check if all required fields are filled
      // if (!habit || !reason || !frequencyDays || !Object.values(days).includes(true)) {
      //   Alert.alert("Missing Information", "Please fill out all required fields.");
      //   return; 
      // }

    await saveHabitData().then(() => {
      reset();
      navigation.navigate("HabitCreatedScreen");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Define the habit</Text>

        <Text style={styles.label}>I want to</Text>

        <TextInput
          style={[styles.input, { marginBottom: RFPercentage(1) }]}
          placeholder="Enter habit name"
          value={habit}
          onChangeText={setHabit}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.placeholderText}>
            Simply dummy text of the printing
          </Text>
          <Text style={styles.placeholderText}>Dummy Text</Text>
        </View>

        <Text style={styles.label}>because</Text>
        <View style={styles.row}>
          <Text style={styles.placeholderText}>
            This habit will help me become
          </Text>
          <TextInput
            style={[styles.input, { width: width * 0.4, marginLeft: 10 }]} 
            value={reason}
            onChangeText={setReason}
          />
        </View>

        <Text style={styles.label}>Frequency</Text>
        <View style={styles.frequencyRow}>
          <TextInput
            style={[styles.input, { width: width * 0.4, marginRight: 20 }]} 
            placeholder="No. of times"
            keyboardType="numeric"
            onChangeText={setfrequencyDays}
            value={frequencyDays}
          />
          <Text style={{ marginHorizontal: 10 }}>per</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            value={frequency}
            onValueChange={(value) => setFrequency(value)}
            placeholder={{ label: "Week", value: "Week" }}
            items={[{ label: "Month", value: "Month" }]}
          >
            <TouchableOpacity>
              <Text>{frequency} ▼</Text>
            </TouchableOpacity>
          </RNPickerSelect>
        </View>

        <Text style={styles.label}>On</Text>
        <View style={styles.daysRow}>
          {["S", "M", "T", "W", "Th", "F", "Sa"].map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                { backgroundColor: days[day] ? "#000" : "#e9e9e9" },
              ]}
              onPress={() => handleDayPress(day)}
            >
              <Text
                style={{
                  color: days[day] ? "#FFF" : "#000",
                  fontWeight: "bold",
                }}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>For next</Text>
        <View style={styles.durationRow}>
          {["1 week", "2 weeks", "1 month", "2 months"].map((period, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.durationButton,
                {
                  backgroundColor: duration === period ? "#9b9b9b" : "#e9e9e9",
                },
              ]}
              onPress={() => handleDurationPress(period)}
            >
              <Text style={{ color: "#000", fontWeight: "bold" }}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{ marginBottom: RFPercentage(5), marginTop: RFPercentage(3) }}
        >
          <TouchableOpacity
            style={styles.newUserButton}
            onPress={createHabitHandler}
          >
            <Text style={styles.buttonText}>
              Create and continue (new user)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oldUserButton}
            onPress={createHabitHandler}
          >
            <Text style={styles.buttonText}>
              Create and continue (Old user)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: RFPercentage(2.5),
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "space-evenly",
    // height : '100%'
  },
  title: {
    fontSize: RFPercentage(3.3), 
    fontWeight: "bold",
    marginBottom: RFPercentage(2),
  },
  label: {
    fontSize: RFPercentage(2.2), 
    fontWeight: "bold",
    marginBottom: RFPercentage(1.5),
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: RFPercentage(2),
  },
  placeholderText: {
    color: "#ccc",
    marginBottom: RFPercentage(2),
    // backgroundColor : 'red'
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  frequencyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFPercentage(2),
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: RFPercentage(2),
  },
  dayButton: {
    height: RFPercentage(4),
    width: RFPercentage(4),
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  durationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: RFPercentage(2),
    width: "100%",
  },
  durationButton: {
    paddingVertical: RFPercentage(1),
    // paddingHorizontal: RFPercentage(1.5),
    borderRadius: 40,
    width: "23%",
    alignItems: "center",
  },
  newUserButton: {
    // backgroundColor: "#000",
    padding: RFPercentage(2),
    borderRadius: 10,
    alignItems: "center",
    marginBottom: RFPercentage(1.5),
  },
  oldUserButton: {
    backgroundColor: "#E0E0E0",
    padding: RFPercentage(2),
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: RFPercentage(1.8),
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: RFPercentage(2.2),
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: RFPercentage(2.2),
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
};
