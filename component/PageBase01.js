import { View } from "react-native";
import ComTitle from "./ComTitle";
import Flexv from "./Flexv";
import { useEffect } from "react";
import utils from "../common/utils";
import { useAuth } from "../common/AuthContext";

const PageBase01=({name,children})=>{
  useEffect(()=>{
    // utils.dispatch({type:"HIDE"})
  },[])
  return (
    <View style={{flexDirection:'column',width:'100%',height:'100%',justifyContent:'center',alignItems:'center',}}>
      <ComTitle name={name}></ComTitle>
      <View style={{width:'95%',height:'95%',position:'relative'}}>
        <Flexv>
          {children}
        </Flexv>
      </View>
    </View>
  )
}

PageBase01.defaultProps={
  name:"",
  children:{},
}

export default PageBase01