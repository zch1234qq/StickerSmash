import axios from "axios"
import { useEffect, useState,useCallback } from "react"
import {  View } from "react-native"
import utils from "../common/utils"
import PageBase0 from "../component/PageBase0";
import CardShell from "../component/CardShell";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Flexh from "../component/Flexh";
import { IconButton } from "react-native-paper";
import { useAuth } from "../common/AuthContext";
import { useFocusEffect } from "@react-navigation/native";


const PageDesktop=({navigation})=>{
  const [clones,setClones]=useState([])
  const {state,dispatch}=useAuth()
  useFocusEffect(
    useCallback(()=>{
      dispatch({type:"SHOW"})
      AsyncStorage.getItem("token")
      .then(token=>{
        axios.get(
          utils.url+"getuserinfo",
          {
            headers:{
              'Authorization': `Bearer ${token}`
            }
          }
        )
        .then(res=>{
          var data=res.data
          setClones(data.clones)
          data.clones.forEach((item,index)=>{
            AsyncStorage.setItem(item.cloneid,JSON.stringify(item))
          })
          AsyncStorage.setItem("clones",JSON.stringify(data.clones))
        })
        .catch(res=>{
          console.log(res)
        })
      })
    },[])
  )
  return(
    <View style={{width:'100%',height:'100%'}}>
      <View style={{width:'100%',height:'100%',position:'absolute'}}>
        <Flexh>
          <IconButton icon={"cog"} size={utils.fontSize2}
            style={{position:"absolute",left:0,zIndex:100}}
            onPress={()=>{console.log("qwe")}}
          />
          <IconButton icon={"logout"} size={utils.fontSize2}
            style={{position:"absolute",right:0,zIndex:100}}
            onPress={()=>{dispatch({type:"LOGOUT"})}}
          />
        </Flexh>
        <PageBase0 name={"桌面页"}>
          {clones.map((item,index)=>(
            <View key={index} style={{width:"100%",height:"25%"}}>
              <CardShell clone={item} type={item.type}/>
            </View>
          ))}
        </PageBase0>
      </View>
    </View>
  )
}

export default PageDesktop