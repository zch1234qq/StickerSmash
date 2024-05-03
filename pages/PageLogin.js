import { Button, TextInput } from "react-native-paper";
import PageBase0 from "../component/PageBase0";
import Flexh from "../component/Flexh";
import ComSpacer from "../component/ComSpacer";
import { useEffect, useState,useCallback } from "react";
import axios from "axios";
import utils from "../common/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../common/AuthContext";

const PageLogin=({navigation,route})=>{
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const {positive=true}=route.params
  const {state,dispatch}=useAuth()

  useFocusEffect(
    useCallback(()=>{
      dispatch({type:"SHOW"})
    },[])
  )
  
  function toDesktop(){
    dispatch({type:"LOGIN"})
    navigation.navigate("桌面")
  }
  function logup(){
    var data={
      username:username,
      password:password
    }
    axios.post(
      utils.url+"logup",
      data
    )
    .then(res=>{
      if(res.data.success){
        if(positive)
          toDesktop()
        else
          navigation.goBack()
      }
    })
    .catch(res=>{
      console.log(res)
    })
  }
  function login(){
    var data={
      username:username,
      password:password
    }
    console.log(data)
    axios.post(
      utils.url+"login",
      data
    )
    .then(res=>{
      utils.token=res.data.token
      AsyncStorage.setItem("token",utils.token)
      console.log(res.data.token)
      if(res.data.success){
        if(positive)
          toDesktop()
        else
          navigation.goBack()
      }
    })
    .catch(res=>{
      console.log(res)
    })
  }
  return (
    <PageBase0
      name={'登录'}
    >
      <TextInput label="手机号/用户名" onChangeText={(value)=>{setUsername(value)}} value={username} mode="outlined" style={{width:'100%'}}></TextInput>
      <ComSpacer height={15}></ComSpacer>
      <TextInput label="密码" secureTextEntry onChangeText={(value)=>{setPassword(value)}} value={password} mode="outlined" style={{width:'100%'}}></TextInput>
      <ComSpacer height={15}></ComSpacer>
      <Flexh>
        <Button mode='elevated' icon='account-plus-outline'
          onPress={logup}
        >注册</Button>
        <Button mode='contained' icon='login'
          onPress={login}
        >登录</Button>
      </Flexh>
    </PageBase0>   
  )
}
export default PageLogin