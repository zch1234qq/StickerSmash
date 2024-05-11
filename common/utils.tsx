import axios from "axios";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import * as MediaLibrary from 'expo-media-library';

let recording:Audio.Recording
const url="https://bxjs.store:8892/"
const url2="http://192.168.1.103:8888/"
const localhost="http://localhost:8888/"

async function checkPermissions() {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === 'granted') {
    console.log('Media library permissions granted');
  } else {
    console.log('Media library permissions denied');
  }
}

async function playRecording(uri:string) {
  const sound = new Audio.Sound();
  try {
      await sound.loadAsync({ uri });
      await sound.playAsync();
  } catch (error) {
      console.error('Error loading or playing sound:', error);
  }
}

async function requestStoragePermission() {
  const { status } = await FileSystem.requestPermissionsAsync();
  if (status === 'granted') {
    console.log('File system permission granted');
    return true;
  } else {
    console.log('File system permission denied');
    return false;
  }
}
async function stopRecording(recCallback:(uri:string)=>void) {
    try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); // 获取录音文件的 URI
        if (uri) {
          recCallback(uri)
          // const filename = uri.split('/').pop(); // 从 URI 中提取文件名
          // const destinationUri = `${FileSystem.documentDirectory}${filename}`;
          
          // await FileSystem.moveAsync({
          //   from: uri,
          //   to: destinationUri,
          // });
          // playRecording(destinationUri)

          //   console.log('Recording stopped and stored at', destinationUri);
          //   return destinationUri;
        }
    } catch (error) {
        console.error('Failed to stop recording:', error);
    }
}

async function getPermissions() {
    const response = await Audio.requestPermissionsAsync();
    return response.status === 'granted';
}

async function prepareRecording() {
    await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
    });
}

async function startRecording() {
    const hasPermission = await getPermissions();
    if (!hasPermission) {
        console.error('Permissions not granted');
        return;
    }
    await prepareRecording();
    recording = new Audio.Recording();
    try {
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync(); // 开始录音
        console.log('Recording started');
        return recording;
    } catch (error) {
        console.error('Failed to start recording:', error);
    }
}

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
  }
}
var token=""
var fontSize0=12
var fontSize1=18
var fontSize2=24
var fontSize3=36
var navigation=null
var dispatch=null
var hideNavBar=null
var logined
var setLogined
const AdminTextinputlabelClonename_sms="例如:XX产品使用说明"
const AdminTextinputlabelClonename_kf="客服名称(例如:XX店铺售前客服))"
const AdminTextinputlabelPrompt_sms="例如:你是__产品的使用说明,__产品重800克,工作温度范围是0℃~50℃)"
const AdminTextinputlabelPrompt_kf="客服对话信息(例如:你是XX水果店的客服,苹果的价格是?元/斤,桔子的价格是?元/斤)"
const TipColor={
  Success:"#ffecec",
  Fail:"#003300",
  Info:"#000077",
}
export const ThemeColor={
  Orange:"#ffaa00"
}
var get401=false

export default{
  url,
  url2,
  localhost,
  startRecording,
  stopRecording,
  getPermissions,
  token,
  fontSize0,
  fontSize1,
  fontSize2,
  fontSize3,
  navigation,
  dispatch,
  hideNavBar,
  logined,
  setLogined,
  AdminTextinputlabelClonename_sms,
  AdminTextinputlabelPrompt_sms,
  TipColor,
  get401,
  ThemeColor,
  requestStoragePermission,
  checkPermissions,
}