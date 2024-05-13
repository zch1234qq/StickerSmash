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
    dispatch({type:"HIDE"})
    console.log("intoMark")
  },[])

  function mark(cloneid){
    setDismark(true)
    Axios.post("/markclone",data={cloneid:cloneid})
    .then(res=>{
      var data=res.data
      console.log(data)
      if(data.success){
        navigation.replace("admin",{cloneid:cloneid})
        dispatch({type:"SUCCESS",message:data.message})
      }else{
        dispatch({type:"FAIL",message:data.message})
      }
    })
    .catch(err=>{
      console.log(err)
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
          mark(cloneid)
        }}
      >标记</Button>
    </PageBase1>
  )
}