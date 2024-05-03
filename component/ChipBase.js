import { useEffect, useState } from "react";
import { View,Dimensions } from "react-native";
import { Chip } from "react-native-paper";

const ChipBase=({type,color})=>{
  const [width,setWidth]=useState(0)
  useEffect(()=>{
    console.log("mounted")
    var _width=Dimensions.get('window').width
    setWidth(_width/5.2)
  },[])

  return (
    <View style={{width:width,left:0,bottom:0}}>
      <Chip
        textStyle={{fontSize:12,color:'white'}}
        style={{backgroundColor:color}}
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