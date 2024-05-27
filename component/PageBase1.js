import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAuth } from "../common/AuthContext";
import ComTitle from "./ComTitle";
import Flexv from "./Flexv";
import utils from "../common/utils";

const PageBase1=({children,name})=>{
  const store=useAuth()
  const navigation=useNavigation()
  useEffect(()=>{
    utils.dispatch({type:"HIDE"})
  },[])
  return !store.state.empty2&&(
    <View style={{width:'100%',height:'100%'}}>
      <View style={{width:'100%',height:'100%',position:'absolute'}}>
        <IconButton icon='chevron-left' size={36} 
          onPress={()=>{navigation.goBack()}}
          style={{left:0,zIndex:100,position:"absolute"}}>
        </IconButton>
        <View style={{flexDirection:'column',width:'100%',height:'100%',justifyContent:'center',alignItems:'center',}}>
          <ComTitle name={name}></ComTitle>
          <View style={{width:'75%',height:'95%',position:'relative'}}>
            <Flexv>
              {children}
            </Flexv>
          </View>
        </View>
      </View>
    </View>
  )
}
PageBase1.defaultProps={
  children:{},
  name:"",
}

export default PageBase1