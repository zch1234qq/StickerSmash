import React, { useEffect, useState,useRef } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Clone } from '../common/classes';
import PageBase1 from '../component/PageBase1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Axios from '../common/Axios';
import { useAuth } from '../common/AuthContext';
import utils from '../common/utils';

export default function PageMark({navigation,route}) {
  var {cloneid}=route.params
  const {state,dispatch}=useAuth()
  const [dismark,setDismark]=useState(false)

  useEffect(()=>{
    console.log("intoMark")
  },[])

  function mark(){
    setDismark(true)
    var userinfo=utils.userinfo
    if(utils.token!=""&&userinfo.maxfscount<=userinfo.cloneids.length){
      dispatch({type:"FAIL",message:"已拥有,跳转至桌面"})
      utils.navigation.reset({
        index: 0,
        routes: [{
          name: 'desktop',
          params: { positive:false},
        }],
      });
      return
    }
    Axios.post("/markclone")
    .then(res=>{
      var data=res.data
      console.log(data)
      if(data.success){
        navigation.replace("admin",{cloneid:data.cloneid,simple:true})
        dispatch({type:"SUCCESS",message:data.message})
      }else{
        dispatch({type:"FAIL",message:data.message})
      }
    })
    .catch(err=>{
      console.log(err.response)
    })
    .finally(res=>{
      setDismark(false)
    })
  }
  return (
    <PageBase1 name="标记">
      <Button
        mode='outlined'
        icon={"star-plus-outline"}
        disabled={dismark}
        onPress={()=>{
          mark()
        }}
      >标记</Button>
    </PageBase1>
  )
}