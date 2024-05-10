import { View } from "react-native";
import PageBase0 from "./PageBase0";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const PageBase1=({children,name})=>{
  const navigation=useNavigation()
  return (
    <View style={{width:'100%',height:'100%'}}>
      <View style={{width:'100%',height:'100%',position:'absolute'}}>
        <IconButton icon='chevron-left' size={36} 
          onPress={()=>{navigation.goBack()}}
          style={{left:0,zIndex:100,position:"absolute"}}></IconButton>
        <PageBase0>
          {children}
        </PageBase0>
      </View>
    </View>
  )
}
PageBase1.defaultProps={
  children:{},
  name:"",
}

export default PageBase1