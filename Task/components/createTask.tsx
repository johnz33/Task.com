import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import Status from "./status";
import axios from "axios";
import { useSelector } from "react-redux";

interface MyProps {
  modalVisible: (message: boolean) => void;
}

const CreateTask = ({ modalVisible }: MyProps) => {
  const [title, setTiltle] = useState<String>("");
  const [message, setMessage] = useState<String>("");
  const status =useSelector((state: any) => state.status.value);
  const [bug, setBug] = useState<Object>({
    title: "",
    message: "",
    status: "",
  });

  useEffect(() => {
    setBug({ title: title, message: message, status: status });
  }, [title, message, status]);

  const send = async () => {
    try {
      const response = await axios.post(
        "http://66c2d749d057009ee9be10aa.mockapi.io/TodoApp/bugs",
        bug
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={{ display: "flex", alignItems: "center" }}>
        <Text style={styles.title}>
          C<Text style={styles.titlesub}>reate</Text> a B
          <Text style={styles.titlesub}>ug</Text>
        </Text>
        <View style={{ width: 250, marginTop: 60 }}>
          <TextInput
            style={{
              borderWidth: 1.3,
              borderColor: Colors.primary,
              padding: 13,
              borderRadius: 10,
            }}
            placeholder="Enter the Title ..."
            onChangeText={setTiltle}
          />
          <Text
            style={{
              position: "absolute",
              bottom: 37,
              left: 25,
              backgroundColor: "white",
              color: Colors.primary,
            }}
          >
            {" "}
            Title{" "}
          </Text>
        </View>
        <View style={{ width: 250, marginTop: 30 }}>
          <TextInput
            style={{
              borderWidth: 1.3,
              borderColor: Colors.primary,
              padding: 13,
              borderRadius: 10,
            }}
            placeholder="Enter the message ..."
            onChangeText={setMessage}
          />
          <Text
            style={{
              position: "absolute",
              bottom: 37,
              left: 25,
              backgroundColor: "white",
              color: Colors.primary,
            }}
          >
            {" "}
            Message{" "}
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Status statusValue={""} statusid={""}/>
        </View>
        <Pressable
          style={{
            backgroundColor: Colors.primary,
            height: 40,
            width: 90,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginTop: 30,
          }}
          onPress={() => {
            send();
            modalVisible(false);
          }}
        >
          <Text style={{ color: "white", fontFamily: "rob" }}>Create</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: Colors.primary,
            height: 40,
            width: 90,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginTop: 20,
            marginBottom: 900,
          }}
          onPress={() => modalVisible(false)}
        >
          <Text style={{ color: "white", fontFamily: "rob" }}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.primary,
    textAlign: "center",
    fontSize: 25,
    marginTop: 80,
  },
  titlesub: {
    color: "black",
  },
});

export default CreateTask;
