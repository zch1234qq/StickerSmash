import { StyleSheet } from "react-native";
import { View } from "react-native";

export default Flexh2=({children})=>{
  return <View style={styles.centered}>{children}</View>
}
const styles=StyleSheet.create({
  centered: {
    width:'100%',
    flexDirection:'row',
    alignItems:'center'
  }
})