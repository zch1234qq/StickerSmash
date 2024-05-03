import { StyleSheet, View } from "react-native"

const ComSpacer=({height})=>{
  return (
    <View style={{height:height,width:'100%'}}>

    </View>
  )
}
ComSpacer.defaultProps={
  height:0
}
export default ComSpacer