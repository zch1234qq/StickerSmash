import { IconButton, Text } from "react-native-paper"
import WebView from "react-native-webview"
import { View } from "react-native"
import utils from "../common/utils"
import { useEffect } from "react"

export default PageProtocolBase=({url,logup})=>{
  useEffect(()=>{
    return ()=>{
      if(logup){
        utils.dispatch({type:"SHOWDIALOG"})
      }
    }
  },[])
  return(
    <View style={{height:"100%"}}>
      <IconButton icon='chevron-left' size={36} 
        onPress={()=>{
          utils.dispatch({type:"SHOWDIALOG"})          
          utils.navigation.goBack()
        }}
        style={{left:0,zIndex:100,position:"absolute"}}></IconButton>
      <WebView 
        source={{uri:url}}
        style={{width:"100%",height:"100%",zIndex:100,position:"absolute"}}
      />
    </View>
  )
}
PageProtocolBase.defaultProps={
  logup:false
}