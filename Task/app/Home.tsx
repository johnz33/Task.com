import { View, Text, Modal, SafeAreaView, StyleSheet,Image, Pressable, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Introduction from "@/components/Introduction";
import Loader from "@/components/Loader";
import { Colors } from "@/constants/Colors";
import axios from "axios";
import Status from "@/components/status";
import CreateTask from "@/components/createTask";
import { useSelector } from "react-redux";


const Home = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState([]);
  const [textInputValue, setTextInputValue] = useState<String>("");
  const [selectedId, setSelectedId] = useState<String>("");
  const [selectedITitle, setSelectedTitle] = useState<String>("");
  const [textInputVisible, setTextInputVisible] = useState<boolean>(false);
  const [createBugModalVisible, setCreateBugModalVisible] = useState<boolean>(false);
  const status =useSelector((state: any) => state.status.value);
  const editMsge = {
    title: selectedITitle,
    message: textInputValue
  };

  // API integration

  const edit = async (id: any) => {
    try {
      const response = await axios.put(
        `http://66c2d749d057009ee9be10aa.mockapi.io/TodoApp/bugs/${id}`,
        editMsge
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetch = async () => {
    try {
      const response = await axios.get(
        "http://66c2d749d057009ee9be10aa.mockapi.io/TodoApp/bugs"
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bugsDelete = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://66c2d749d057009ee9be10aa.mockapi.io/TodoApp/bugs/${id}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      fetch();
    }, 2000);
  }, [data]);

  const sendData = (data: boolean) => {
    setModalVisible(data);
  };

  const createBugsModal = (value: boolean) => {
    setCreateBugModalVisible(value);
  };

  return (
    <SafeAreaView>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:"space-between",
                  marginHorizontal:15
                }}
              >
                <Text style={styles.title}>
                  Task<Text style={styles.titlesub}>.com</Text>
                </Text>
                <View>
                  <Image
                    source={require("../assets/images/clipboard.png")}
                    style={{
                      height: 40,
                      width: 40,
                      marginTop: 20,
                      marginRight: 10,
                    }}
                  />
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      backgroundColor: "#B22222",
                      borderRadius: 12.5,
                      position: "absolute",
                      left: 20,
                      top: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        paddingTop: 4,
                      }}
                    >
                      {data?.length}
                    </Text>
                  </View>
                </View>
              </View>
          <Text style={{ fontSize: 20, padding: 20 }}>List of Tasks :</Text>
          <View style={{ display: "flex", alignItems: "center" }}>
                <FlatList
                  data={data}
                  renderItem={({ item, index }: any) => {
                    return (
                     <View>
                       <View
                        style={{
                          backgroundColor: Colors.primary,
                          width: 350,
                          borderRadius: 10,
                          marginBottom: 10,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: 10,
                          }}
                        >
                          <Text style={{ color: "white" }}>
                            {index + 1}.Title:{item?.title}
                          </Text>
                        </View>
                        {item?.id === selectedId && textInputVisible ? (
                          <View>
                            <TextInput
                              onChangeText={setTextInputValue}
                              placeholder="Enter the message ..."
                              style={{
                                marginHorizontal: 10,
                                padding: 10,
                                backgroundColor: "white",
                                color: "black",
                                borderRadius: 5,
                                position: "relative",
                              }}
                            />
                          </View>
                        ) : (
                          <Text
                            style={{ color: "white", marginHorizontal: 10 }}
                          >
                            Message:{item?.message}
                          </Text>
                        )}
                        <View>
                          {item?.id === selectedId && textInputVisible ? (
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginVertical: 10,
                              }}
                            >
                              <Pressable
                                style={{
                                  backgroundColor: "white",
                                  padding: 5,
                                  borderRadius: 10,
                                  marginLeft: 10,
                                }}
                                onPress={() => {
                                  edit(item?.id);
                                  setTextInputVisible(!textInputVisible);
                                }}
                              >
                                <Text style={{ color: "black" }}>Ok</Text>
                              </Pressable>
                              <Pressable
                                style={{
                                  backgroundColor: "white",
                                  padding: 5,
                                  borderRadius: 10,
                                  marginLeft: 10,
                                }}
                              >
                                <Text style={{ color: "black" }}>Cancel</Text>
                              </Pressable>
                            </View>
                          ) : (
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginVertical: 10,
                              }}
                            >
                              <Pressable
                                style={{
                                  backgroundColor: "white",
                                  padding: 5,
                                  borderRadius: 10,
                                  marginLeft: 10,
                                }}
                                onPress={() => {
                                  setSelectedId(item?.id);
                                  setSelectedTitle(item?.title)
                                  setTextInputVisible(!textInputVisible);
                                }}
                              >
                                <Text style={{ color: "black" }}>Edit</Text>
                              </Pressable>
                              <Pressable
                                style={{
                                  backgroundColor: "white",
                                  padding: 5,
                                  borderRadius: 10,
                                  marginLeft: 10,
                                }}
                                onPress={() => {
                                  bugsDelete(item?.id);
                                }}
                              >
                                <Text style={{ color: "black" }}>Delete</Text>
                              </Pressable>
                            </View>
                          )}
                        </View>
                      </View>
                      <View style={{position:"absolute",left:220,top:10}}>
                        <Status statusValue={item?.status} statusid={item?.id}/>
                      </View>
                     </View>
                    );
                  }}
                />
              </View>
              <View
            style={{
              backgroundColor: "white",
              height: 40,
              width: 90,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderWidth:1.3,
              borderColor:Colors.primary,
              alignSelf: "flex-end",
              position: "absolute",
              right: 20,
              top: 650,
            }}
          >
            <Pressable
              onPress={() => {
                createBugsModal(true);
              }}
            >
              <Text style={{ color: Colors.primary, fontFamily: "rob-bold" }}>
                + Create
              </Text>
            </Pressable>
          </View>
          <Modal
            visible={modalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <Introduction modalVisible={sendData} />
          </Modal>
          <Modal
            visible={createBugModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <CreateTask modalVisible={createBugsModal} />
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    color: Colors.primary,
    textAlign: "center",
    fontSize: 40,
    marginTop: 20,
  },
  titlesub: {
    color: "black",
  },
});
