import { StyleSheet } from "react-native";
import { View } from "react-native";

const Flexh=({children})=>{
  return <View style={styles.centered}>{children}</View>
}
const styles=StyleSheet.create({
  centered: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
  }
})

export default Flexh