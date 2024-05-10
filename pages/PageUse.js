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
import FileUploader from '../component/FIlePicker'
import Axios from '../common/Axios'
import { Audio } from 'expo-av'
const superagent = require('superagent');
import FormData from 'form-data'
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export default function PageUse({route}){
  const cloneid=route.params.cloneid
  const [clone,setClone]=useState(new Clone("","","","",""))
  const [icon,setIcon]=useState('microphone-outline')
  const [ans,setAns]=useState("")
  const [inputByAudio,setInputByAudio]=useState(true)
  const {state,dispatch}=useAuth()
  const [messageToSend,setMessageToSend]=useState("")
  const [disabledBtSend,setDisableBtSend]=useState(true)
  const [messages,setMessages]=useState([])
  const [sending,setSending]=useState(false)
  const [fileUri,setFileUri]=useState("")
  const [havePerm,setHavePerm]=useState(false)

  useEffect(()=>{
    dispatch({type:"HIDE"})
    testPermission()
    clone.visitclone(cloneid,setClone)
  },[])
  async function testPermission(){
    const { status } = await Audio.getPermissionsAsync();
    if(status=="granted"){
      setHavePerm(true)
    }
  }
  async function pickDocument() {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result.assets[0].uri)
    if (result.canceled === false) {
      setFileUri(result.assets[0].uri)
    } else {
      console.error('No file selected or an error occurred');
    }
  }
  
  async function rec() {
    try {
      // setFileUri("file:///data/user/0/host.exp.exponent/cache /DocumentPicker/7cf2fcc0-5aaf-4141-abe8-3b271867004c.m4a")
      const response = await fetch(fileUri);
      const blob = await response.blob();
      superagent.post(utils.url2+"tooss")
          // .attach('audio', blob, 'file.wav')
          .then(response => {
              console.log('Upload successful:', response);
          })
          .catch(error => {
              console.error('Upload failed:', error);
          });
    } catch (error) {
        console.error('Error uploading file:', error);
    }
  }
  function toGpt(currentMsg){
    setMessageToSend("")
    setSending(true)
    const data = {
      messages: [...messages,currentMsg],
      cloneid:cloneid
    };
    console.log(data)
    axios.post(
      utils.url+"gpt",
      data,
    )
    .then(res=>{
      console.log(res)
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
      console.log("err "+res)
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
      // 权限已被授予
      console.log("已有权限")
      utils.startRecording()
      setIcon("microphone");
      setAns("nihaoa");
    }
  }
  return (
    <PageBase2>
      <View style={{width:'100%',height:'100%',flexDirection:"column-reverse",justifyContent:'space-between',alignItems:'center'}}>
        <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",}}>
          {inputByAudio && <IconButton icon={icon} size={72}
          style={{position:"absolute",zIndex:100}}
            onPressIn={()=>{
              // checkPermission()
              rec()
            }}
            onPressOut={()=>{
              // if(havePerm){
              //   utils.stopRecording()
              //   setIcon("microphone-outline")
              //   rec()
              // }
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
                  toGpt(messageToSend)
                }}
                ></IconButton>}
              {!inputByAudio && sending && 
                <ActivityIndicator animating={true} color="#6200EE" size={utils.fontSize2} />
              }
            </View>
          </View>
        </View>
        <FileUploader setFileUri={setFileUri}></FileUploader>
        <Button onPress={pickDocument} title='选择文件(测试)'></Button>
        <Button onPress={utils.checkPermissions} title='获取权限(测试)'></Button>
        <Text>{fileUri}</Text>
        <Text>http://192.168.0.170:8888/rec</Text>
        <Text style={{fontSize:utils.fontSize2,width:"80%",textAlign:'left'}}>
          {ans}
        </Text>
        <Text style={{fontSize:utils.fontSize1}}>{clone.name}</Text>
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