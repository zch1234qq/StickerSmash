import { View } from "react-native"
import { Snackbar, Text } from "react-native-paper"
import { useAuth } from "../common/AuthContext"

export const NotiBase=({visible,message,color,textColor="white",icon,iconColor="white"})=>{
  const {state,dispatch}=useAuth()

  return(
    <View style={{width:"100%",top:0,position:"absolute",zIndex:1000}}>
      <Snackbar
        icon="home"
        visible={visible}
        onDismiss={()=>{dispatch({type:"NOTIHIDE"})}}
        style={{backgroundColor:color,position:"absolute"}}
        duration={Snackbar.DURATION_SHORT}
        action={{
          icon:icon,
          textColor:iconColor
        }}>
          <Text style={{color:textColor}}>
            {message}
          </Text>
      </Snackbar>
    </View>
  )
}