import { View } from "react-native";
import { IconButton } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
import ComTitle from "./ComTitle";
import Flexv from "./Flexv";
import { useEffect,useState } from "react";
import utils from "../common/utils";
import { useAuth } from "../common/AuthContext";

export default function PageBase2({children,name}){
  const store=useAuth()
  useEffect(()=>{
    utils.dispatch({type:"HIDE"})
  },[])
  return !store.state.empty2&&(
    <View style={{width:'100%',height:'100%'}}>
      <View style={{width:'100%',height:'100%',position:'absolute'}}>
        <IconButton icon='chevron-left' size={36} 
          onPress={()=>{utils.navigation.goBack()}}
          style={{left:0,zIndex:100,position:"absolute"}}></IconButton>
          <View style={{flexDirection:'column',width:'100%',height:'100%',justifyContent:'center',alignItems:'center',}}>
            <ComTitle name={name}></ComTitle>
            <View style={{width:'100%',height:'100%',position:'relative'}}>
              <Flexv>
                {children}
              </Flexv>
            </View>
          </View>
      </View>
    </View>
  )
}
