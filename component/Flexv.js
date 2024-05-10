import { StyleSheet } from "react-native";
import { View } from "react-native";

const Flexv=({children})=>{
  return <View style={styles.centered}>{children}</View>
}
const styles=StyleSheet.create({
  centered: {
    width:'100%',
    height:'100%',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Flexv