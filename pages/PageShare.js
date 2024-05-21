import { Button, IconButton, Text } from "react-native-paper";
import PageBase2 from "../component/PageBase2";
import QRCode from "react-qr-code";
import * as Clipboard from 'expo-clipboard';
import config from "../common/config";
import utils from "../common/utils";
import { View } from "react-native";
import Flexh from "../component/Flexh";
import ComSpacer from "../component/ComSpacer";
import { Clone } from "../common/classes";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PageShare({route}){
  const {cloneid}=route.params
  const url=config.web+"use?cloneid="+cloneid
  const [clone,setClone]=useState(new Clone())
  const [textColor,setTextColor]=useState("")

  useEffect(()=>{
    AsyncStorage.getItem(cloneid)
    .then(res=>{
      var clone=JSON.parse(res)
      setClone(new Clone(clone.name,clone.type,clone.prompt,clone.adminid))
      setTextColor(utils.Colors[clone.type])
    })
  })
  return(
    <PageBase2>
      {/* <QRCode
        value="cribug"
        size={200}
        color="black"             
        backgroundColor="white"      // 二维码的背景色。
      /> */}
      <View style={{width: "65%",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <QRCode
          size={240} 
          style={{flex:1}}
          value={url}
          viewBox={`0 0 200 200`}
        />
        <ComSpacer height={20}></ComSpacer>
        <Flexh>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize:utils.fontSize1,width:"60%",color:textColor}}>{clone.name}</Text>
          <Button
            icon={"content-copy"}
            onPress={()=>{
              Clipboard.setStringAsync(url)
              console.log(url)
              utils.dispatch({type:"SUCCESS",message:"已复制,粘贴给好友吧"})}}
              >复制链接
          </Button>
        </Flexh>
      </View>
    </PageBase2>
  )
}