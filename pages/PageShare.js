import { IconButton } from "react-native-paper";
import PageBase2 from "../component/PageBase2";
// import QRCode from "react-native-qrcode-svg";
import QRCode from "react-qr-code";
import * as Clipboard from 'expo-clipboard';
import config from "../common/config";
import utils from "../common/utils";
import { View } from "react-native";

export default function PageShare({route}){
  console.log(route)
  const {cloneid}=route.params
  const url=config.web+"#/use/"+cloneid
  return(
    <PageBase2>
      {/* <QRCode
        value="cribug"
        size={200}
        color="black"             
        backgroundColor="white"      // 二维码的背景色。
      /> */}
      <View style={{width: "71%",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <QRCode
          size={220}
          style={{flex:1}}
          value={url}
          viewBox={`0 0 256 256`}
        />
      </View>
      <IconButton
        icon={"content-copy"}
        onPress={()=>{
          Clipboard.setStringAsync(url)
          console.log(url)
          utils.dispatch({type:"SUCCESS",message:"复制成功,在浏览器中粘贴使用"})
        }}
      ></IconButton>
    </PageBase2>
  )
}