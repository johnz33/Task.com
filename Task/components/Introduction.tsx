import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

interface MyIntroductionProps{
    modalVisible:(message:boolean)=>void
}

const Introduction = ({modalVisible}:MyIntroductionProps) => {
    
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <View style={{ marginTop: 300 }}>
        <Text style={styles.Logo}>
          Task<Text style={{ color: "black",fontSize:30 }}>.com</Text>
        </Text>
      </View>
      <View style={{ width: "62%" }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          Your Ultimate Community{" "}
          <Text style={{ color: Colors.primary, fontFamily: "rob" }}>
            Task
          </Text>{" "}
          App{" "}
        </Text>
      </View>
      <View style={{ marginTop: 100, width: "80%" }}>
        <Text style={{ fontFamily: "rob-bold", textAlign: "center" }}>
          Find your Task and Enjoy the app
        </Text>
        <Pressable style={styles.button}
        onPress={()=>modalVisible(false)}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>
            Get Started ...
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  Logo: {
    fontSize: 70,
    color: Colors.primary,
    fontFamily: "rob-bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    marginTop: 10,
    borderRadius: 25,
  },
});
