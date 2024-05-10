import { Text } from "react-native-paper"
import utils from "../common/utils"
import { View } from "react-native"

export default ProtocolBase=({name,routeName,logup})=>{
  return(
    <View>
      <Text style={{color:"blue",padding:0}} 
        onPress={()=>{
          utils.dispatch({type:"HIDEDIALOG"})
          utils.navigation.navigate(routeName,{logup:logup})
        }}
      >{name}</Text>
    </View>
  )
}
ProtocolBase.defaultProps={
  logup:false
}