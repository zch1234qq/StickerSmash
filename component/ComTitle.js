import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const ComTitle=({name})=>{
  return (
    <Text style={styles.s0}>
      {name}
    </Text>
  )
}

ComTitle.defaultProps={
  name:""
}

const styles=StyleSheet.create({
  s0:{
    position:'absolute',
    fontSize:60,
    color:"#00000022",
    width:'100%',
    height:'100%',
    textAlign:'center'
  }
})

export default ComTitle