import { View } from "react-native";
import ComTitle from "./ComTitle";
import Flexv from "./Flexv";

const PageBase0=({name,children})=>{
  return (
    <View style={{flexDirection:'column',width:'100%',height:'100%',justifyContent:'center',alignItems:'center',}}>
      <ComTitle name={name}></ComTitle>
      <View style={{width:'75%',height:'95%',position:'relative'}}>
        <Flexv>
          {children}
        </Flexv>
      </View>
    </View>
  )
}

PageBase0.defaultProps={
  name:"",
  children:{},
}

export default PageBase0