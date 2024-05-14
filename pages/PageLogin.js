import { Button, Checkbox, Dialog, Portal, Text, TextInput } from "react-native-paper";
import PageBase0 from "../component/PageBase0";
import Flexh from "../component/Flexh";
import Flexh2 from "../component/Flexh2";
import ComSpacer from "../component/ComSpacer";
import { useEffect, useState,useCallback } from "react";
import utils from "../common/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../common/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import Axios from "../common/Axios";
import ProtocolService from "../component/ProtocolService";
import ProtocolPrivacy from "../component/ProtocolPrivacy";
import ProtocolBase from "../component/ProtocolBase";

const PageLogin=({navigation,route})=>{
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const {positive=true}=route.params
  const {state,dispatch}=useAuth()
  const [dislogin,setDislogin]=useState(false)
  const [dislogup,setDislogup]=useState(false)
  useFocusEffect(
    useCallback(()=>{
      dispatch({type:"SHOW"})
      utils.get401=false
    },[])
  )
  function toDesktop(){
    dispatch({type:"LOGIN"})
    navigation.navigate("desktop")
  }
  function logup(){
    setDislogup(true)
    var data={
      username:username,
      password:password
    }
    Axios.post(
      "/logup",
      data
    )
    .then(res=>{
      var data=res.data
      if(data.success){
        dispatch({type:"SUCCESS",message:data.message})
        if(positive)
          toDesktop()
        else
          navigation.goBack()
      }else{
        dispatch({type:"FAIL",message:data.message})
      }
    })
    .catch(res=>{
      console.log(res)
    })
    .finally(res=>{
      setDislogup(false)
    })
  }
  function login(){
    setDislogin(true)
    var data={
      username:username,
      password:password
    }
    Axios.post(
      "/login",
      data
    )
    .then(res=>{
      console.log(res)
      var data=res.data
      utils.token=data.token
      AsyncStorage.setItem("token",utils.token)
      AsyncStorage.setItem("maxfscount",data.maxfscount)
      console.log(data)
      if(data.success){
        dispatch({type:"SUCCESS",message:data.message})
        if(positive)
          toDesktop()
        else
          navigation.goBack()
      }else{
        dispatch({type:"FAIL",message:data.message})
      }
    })
    .catch(res=>{
      console.log(res.request)
    })
    .finally(res=>{
      setDislogin(false)
    })
  }
  return (
    <PageBase0 name={'登录页'}>
      <TextInput label="手机号/用户名" onChangeText={(value)=>{setUsername(value)}} value={username} mode="outlined" style={{width:'100%'}}></TextInput>
      <ComSpacer height={15}></ComSpacer>
      <TextInput label="密码" secureTextEntry onChangeText={(value)=>{setPassword(value)}} value={password} mode="outlined" style={{width:'100%'}}></TextInput>
      <ComSpacer height={15}></ComSpacer>
      <Flexh2>
        <Text>点击登录视为您已同意</Text>
        <ProtocolService></ProtocolService>
        <Text>和</Text>
        <ProtocolPrivacy></ProtocolPrivacy>
      </Flexh2>
      <ComSpacer height={15}></ComSpacer>
      <Flexh>
        <Button mode='elevated' icon='account-plus-outline'
          disabled={dislogup}
          onPress={()=>{
            console.log(`username$username`)
            if(username==""||password==""){
              utils.dispatch({type:"FAIL",message:"请填写用户名、密码"})
              return
            }
            dispatch({type:"SHOWDIALOG"})
          }}
        >注册</Button>
        <Button mode='contained' icon='login'
        disabled={dislogin}
          onPress={login}
        >登录</Button>
      </Flexh>
      <Portal>
        <Dialog visible={state.showProtocolDialog} onDismiss={()=>{dispatch({type:"HIDEDIALOG"})}}>
          <Dialog.Content>
            <Flexh2>
              <Text>你是否同意</Text>
              <ProtocolBase name={"服务协议"} routeName={"service"} logup={true}/>
              <Text>、</Text>
              <ProtocolBase name={"隐私条款"} routeName={"privacy"} logup={true}/>
              <Text>、</Text>
              <ProtocolBase name={"账号协议"} routeName={"account"} logup={true}/>
              <Text>?</Text>
            </Flexh2>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={()=>{dispatch({type:"HIDEDIALOG"})}}>不同意</Button>
            <Button onPress={()=>{
              dispatch({type:"HIDEDIALOG"})
              logup()
            }}>同意</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PageBase0>   
  )
}
export default PageLogin