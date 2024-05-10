import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import utils from '../common/utils';
import { Clone } from '../common/classes';
import Flexh from '../component/Flexh';
import PageBase1 from '../component/PageBase1';
import ComSpacer from '../component/ComSpacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from '../common/Axios';
import { useAuth } from '../common/AuthContext';


function PageAdmin({route}) {
  var navigation=useNavigation()
  var {cloneid,simple}=route.params
  const [clone,setClone]=useState(new Clone())
  const [edit,setEdit]=useState(false)
  const [disable,setDisable]=useState(true)
  const {state,dispatch}=useAuth()

  useEffect(()=>{
    dispatch({type:"HIDE"})
    AsyncStorage.getItem(cloneid)
    .then(res=>{
      var clone=JSON.parse(res)
      setClone(new Clone(clone.name,clone.type,clone.prompt,clone.adminid))
      console.log(clone)
    })
    .catch(res=>{
      Axios.get(
        utils.url+"adminclone/"+cloneid
      )
      .then(res=>{
        var data=res.data
        console.log("adminid ")
        console.log(data)
        setClone(data)
      })
      .catch(res=>{
        console.log(res)
      })
    })
  },[])

  function Test(){
    console.log("ceshi"+cloneid)
    navigation.navigate("use",{cloneid:cloneid})
  }

  function Update(){
    Axios.post(
      url=utils.url+"updateprompt",
      data={
        cloneid:cloneid,
        name:clone.name,
        prompt:clone.prompt,
      }
    )
    .then(res=>{
      var data=res.data
      console.log(data)
      if(data.success){
        dispatch({type:"SUCCESS",message:data.message})
      }else{
        dispatch({type:"FAIL",message:data.message})
      }
    })
    .catch(res=>{
      console.log(res)
    })
  }
  return (
    <PageBase1 name="管理">
      {(function(){
        if(simple)
          return
        if(edit){
          return <TextInput value={clone.name} 
          mode='outlined'
          label="名称"
          placeholder={utils.AdminTextinputlabelClonename_sms}
          style={{fontSize:utils.fontSize1,width:'100%',textAlign:'center'}}
          onChangeText={(value)=>{
            setClone(new Clone(value,clone.type,clone.prompt,clone.adminid))
            setDisable(false)
          }}></TextInput>
        }
        else{
          return <Text onPress={()=>{setEdit(true)}} style={{fontSize:utils.fontSize1}}>{clone.name}</Text>
        }
      })()}
      <ComSpacer height={20}></ComSpacer>
      <TextInput mode='outlined' value={clone.prompt}
        onChangeText={(value)=>{
          setClone(new Clone(clone.name,clone.type,value,clone.adminid))
          setDisable(false)
        }}
        onFocus={()=>{setEdit(true)}}
        multiline
        label={"指令"}
        placeholder={utils.AdminTextinputlabelPrompt_sms}
        style={{width:'100%'}}
      ></TextInput>
      <ComSpacer height={20}></ComSpacer>
      <Flexh>
        <Button 
          mode='contained-tonal'
          onPress={Update}
          disabled={disable}
          icon={"update"}
        >更新</Button>
        <Button 
          mode='contained'
          onPress={Test}
          icon={"play-circle"}
        >测试</Button>
      </Flexh>
    </PageBase1>    
  );
}

export default PageAdmin;
