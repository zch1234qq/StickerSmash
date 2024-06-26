import { View } from "react-native";
import ComTitle from "./ComTitle";
import Flexv from "./Flexv";
import { useAuth } from "../common/AuthContext";

const PageBase0=({name,children,empty})=>{
  const store=useAuth()
  if(store.state.empty){
    return
  }
  else
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
  empty:false
}

export default PageBase0