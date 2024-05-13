import { View,Text, Button } from 'react-native'
import {Clone} from '../common/classes'
import { useEffect, useState } from 'react'
import PageBase2 from '../component/PageBase2'
import { IconButton, TextInput } from 'react-native-paper'
import axios from 'axios'
import utils from '../common/utils'
import { useAuth } from '../common/AuthContext'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { Audio } from 'expo-av'
import FormData from 'form-data'

export default function PageUse({route}){
  const cloneid=route.params.cloneid
  const [clone,setClone]=useState(new Clone("","","","",""))
  const [icon,setIcon]=useState('microphone-outline')
  const [ans,setAns]=useState("")
  const [inputByAudio,setInputByAudio]=useState(true)
  const {state,dispatch}=useAuth()
  const [messageToSend,setMessageToSend]=useState("")
  const [disabledBtSend,setDisableBtSend]=useState(true)
  const [disabledBtMic,setDisabledBtMic]=useState(false)
  const [messages,setMessages]=useState([])
  const [sending,setSending]=useState(false)
  const [fileUri,setFileUri]=useState("")
  const [havePerm,setHavePerm]=useState(false)

  useEffect(()=>{
    dispatch({type:"HIDE"})
    clone.visitclone(cloneid,setClone)
  },[])
  function rec(fileUri){
    setDisabledBtMic(true)
    const file = {
      uri: fileUri,
      type: 'audio/aac',  // 这里以 MP3 文件为例
      name: 'example.aac'  // 你希望上传后保存的文件名
    };
    const formData = new FormData();
    formData.append('audio', file);
    axios.postForm(utils.url+"rec",formData,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then(response => {
      var recMsg=response.data.value
      toGpt(clone.type,recMsg)
    })
    .catch(error => {
        console.error('上传文件时出错', error);
    })
    .finally(res=>{
      setDisabledBtMic(false)
    });
  }
  function toGpt(type,msg){
    if(type=="说明书"){
      console.log("getgpt")
      getGpt(msg)
    }else{
      postGpt(msg)
    }
  }
  function getGpt(currentMsg){
    setMessageToSend("")
    setSending(true)
    axios.get(
      utils.url+"gpt/"+cloneid+"/"+currentMsg,
    )
    .then(res=>{
      console.log(res.data)
      var data=res.data
      var answer=data.msg
      messages.push(currentMsg)
      messages.push(answer)
      setAns(answer)
      if(messages.length>4){
          messages.splice(0,2)
        }
      setMessages(messages)
    })
    .catch(res=>{
      setMessageToSend(currentMsg)
    })
    .finally(res=>{
      setSending(false)
    })
  }
  function postGpt(currentMsg){
    setMessageToSend("")
    setSending(true)
    const data = {
      messages: [...messages,currentMsg],
      cloneid:cloneid
    };
    axios.post(
      utils.url+"gpt",
      data,
    )
    .then(res=>{
      var data=res.data
      var answer=data.msg
      messages.push(currentMsg)
      messages.push(answer)
      setAns(answer)
      if(messages.length>4){
          messages.splice(0,2)
        }
      setMessages(messages)
    })
    .catch(res=>{
      setMessageToSend(currentMsg)
    })
    .finally(res=>{
      setSending(false)
    })
  }
  async function checkPermission(){
    const { status } = await Audio.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Audio.requestPermissionsAsync();
      if (newStatus === 'granted') {
        setHavePerm(true)
        console.log("得到权限")
        return
      } else {
        setHavePerm(false)
        console.log("未得到权限")
        return
      }
    } else {
      utils.startRecording()
      setIcon("microphone");
    }
  }
  return (
    <PageBase2>
      <View style={{width:'100%',height:'96%',flexDirection:"column",justifyContent:'space-between',alignItems:'center'}}>
        <Text style={{fontSize:utils.fontSize1}}>{clone.name}</Text>
        <Text style={{fontSize:utils.fontSize2,width:"80%",textAlign:'left'}}>
          {ans}
        </Text>
        <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",}}>
          {inputByAudio && <IconButton icon={icon} size={72}
          disabled={disabledBtMic}
          style={{position:"absolute",zIndex:100}}
            onPressIn={()=>{
              checkPermission()
            }}
            onPressOut={()=>{
              if(havePerm){
                utils.stopRecording(rec)
                setIcon("microphone-outline")
              }
            }}
            >
          </IconButton>}
          <View style={styles.centered}>
            <View style={{flex:1.5,left:0,padding:0}}>
              {inputByAudio && <IconButton icon={"keyboard"} animated={true} iconColor='red' size={utils.fontSize3}
                onPress={()=>{
                  setInputByAudio(!inputByAudio)
                }}
                ></IconButton>}
              {!inputByAudio && <IconButton icon={"microphone-settings"} animated={true} iconColor='red' size={utils.fontSize3}
                onPress={()=>{
                  setInputByAudio(!inputByAudio)
                }}
              ></IconButton>}
            </View>
            {!inputByAudio && <TextInput mode='outlined' label={"发送文字"} value={messageToSend} multiline 
              style={{flex:7,padding:0}} onChangeText={(value)=>{
                setMessageToSend(value)
                value==""?setDisableBtSend(true):setDisableBtSend(false)
              }}
            ></TextInput>}
            <View style={{flex:1.5,padding:0}} >
              {!inputByAudio && !sending && <IconButton icon={"send-circle"} animated={true} iconColor={utils.ThemeColor.Orange} size={utils.fontSize3}
                disabled={disabledBtSend}
                onPress={()=>{
                  toGpt(clone.type,messageToSend)
                }}
                ></IconButton>}
              {!inputByAudio && sending && 
                <ActivityIndicator animating={true} color="#6200EE" size={utils.fontSize2} />
              }
            </View>
          </View>
        </View>
      </View>
    </PageBase2>
  );
}


const styles=StyleSheet.create({
  centered: {
    width:'100%',
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-between"
  }
})