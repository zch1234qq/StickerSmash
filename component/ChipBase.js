import { useEffect, useState } from "react";
import { View,Dimensions } from "react-native";
import { Chip } from "react-native-paper";
import utils from "../common/utils";

const ChipBase=({type,color})=>{
  const [width,setWidth]=useState(0)
  useEffect(()=>{
    console.log("mounted")
    var _width=Dimensions.get('window').width
    setWidth(_width/5.2)
  },[])

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Chip
        textStyle={{fontSize:12,color:'white',textAlign:"center"}}
        style={{backgroundColor:utils.Colors[type],}}
        onPress={()=>{console.log(type)}}
      >{type}</Chip>
    </View>
  )
}
ChipBase.defaultProps={
  type:'',
  color:'',
}
export default ChipBase