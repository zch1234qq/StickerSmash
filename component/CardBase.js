import { Card, IconButton, Text } from "react-native-paper";
import { Share, View } from "react-native";
import { Clone } from "../common/classes";
import utils from "../common/utils";
import { useNavigation } from "@react-navigation/native";
import Flexh from "./Flexh";

const CardBase=({clone,color,children})=>{
  var navigation=useNavigation()
  function onClick(){
    console.log(clone.cloneid)
    navigation.navigate("admin",{cloneid:clone.cloneid,simple:false})
  }
  return (
    <View style={{width:'100%',height:"90%"}}>
      <Card
        onPress={onClick}
        style={{backgroundColor:color,width:"100%",height:"100%"}}
      >
        <Card.Content style={{height:"100%",flexDirection:"column",justifyContent:"space-between"}}>
          <Text style={{textAlign:"center",fontSize:utils.fontSize1}}>{clone.name}</Text>
          <Flexh>
            {children}
            <IconButton
              icon={"qrcode"}
              onPress={()=>utils.navigation.navigate("share",{cloneid:clone.cloneid})}
            ></IconButton>
          </Flexh>
        </Card.Content>
      </Card>
    </View>
  )
}
CardBase.defaultProps={
  clone:new Clone(),
  color:"white",
  children:{}
}

export default CardBase