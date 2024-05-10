import axios from "axios"
import { useEffect, useState,useCallback } from "react"
import {  View } from "react-native"
import utils from "../common/utils"
import PageBase0 from "../component/PageBase0";
import CardShell from "../component/CardShell";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Flexh from "../component/Flexh";
import { Button, IconButton } from "react-native-paper";
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
            style={{position:"absolute",top:0,left:0,zIndex:100}}
            onPress={()=>{utils.navigation.navigate("setting")}}
          />
          <IconButton icon={"logout"} size={utils.fontSize2}
            style={{position:"absolute",top:0,right:0,zIndex:100}}
            onPress={()=>{
              dispatch({type:"SUCCESS",message:"已退出登录"})
              dispatch({type:"LOGOUT"})
            }}
          />
        </Flexh>
        <PageBase0 name={"桌面页"}>
          {clones!=null && clones.map((item,index)=>(
            <View key={index} style={{width:"100%",height:"25%"}}>
              <CardShell clone={item} type={item.type}/>
            </View>
          ))}
          {(clones==null || clones.length==0) && 
            <Button mode="elevated" icon={"plus"}
              labelStyle={{fontSize:utils.fontSize1,textAlign:"center"}}
              onPress={()=>navigation.navigate("create")}
            >创建</Button>
          }
        </PageBase0>
      </View>
    </View>
  )
}

export default PageDesktop