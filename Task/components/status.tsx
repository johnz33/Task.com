import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { selectedStatus } from "@/app/redux/action";
import axios from "axios";

interface MyStatusProps{
    statusValue:string,
    statusid:string
}
const Status = ({statusValue,statusid}:MyStatusProps) => {

  const [select, setSelect] = useState<boolean>(false);
  const [status,setStatus]=useState<string>(statusValue)
  const dispatch=useDispatch();

  const edit = async (id: any) => {
    try {
      const response = await axios.put(
        `http://66c2d749d057009ee9be10aa.mockapi.io/TodoApp/bugs/${id}`,
        {"status":status}
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
      dispatch(selectedStatus(status))
  },[status])

  useEffect(()=>{
    statusid != "" && edit(statusid)
  },[status])
  return (
    
    <View
      style={{
        width: 125,
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "space-around",
        borderRadius: 15,
        borderColor:Colors.primary,
        borderWidth:1.3
      }}
    >
      <Pressable
        onPress={()=>{setSelect(!select)
            select===true && setSelect(false)}
        }
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{statusValue!=""?statusValue:"status"}</Text>
        <Image
          source={require("../assets/images/down-arrow.png")}
          style={{ height: 15, width: 15 }}
        />
      </Pressable>
      <Pressable>
        {select && (
          <View>
            <Pressable onPress={()=>{ 
                 setStatus("Open")
                 setSelect(false)
                }}

                 style={{backgroundColor:status==="Open"?"black":"white"}}><Text style={{ textAlign: "center",color: status==="Open"?"white":"black"}}> Open</Text></Pressable>
            <Pressable 
            onPress={()=>{
                 setStatus("Work-progress")
                 setSelect(false)
                }}
                 style={{backgroundColor:status==="Work-progress"?"black":"white"}}><Text style={{ textAlign: "center",color:status==="Work-progress"?"white":"black" }}>Work-Progress</Text></Pressable>
            <Pressable 
            onPress={()=>{
                 setStatus("Closed")
                 setSelect(false)
                 }}
                 style={{backgroundColor:status==="Closed"?"black":"white"}}><Text style={{ textAlign: "center",color:status==="Closed"?"white":"black" }}> Closed</Text></Pressable>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Status;
