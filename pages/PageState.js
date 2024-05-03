import ComState from "../component/ComState"
import { Clone } from "../common/classes"
import utils from "../common/utils"
const { useEffect, useState,useCallback } = require("react")
const { default: PageBase0 } = require("../component/PageBase0")
const { default: AsyncStorage } = require("@react-native-async-storage/async-storage")
import axios from "axios"
import ComSpacer from "../component/ComSpacer"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native-paper"
import { useAuth } from "../common/AuthContext"
import { useFocusEffect } from "@react-navigation/native"

const PageState=({navigation})=>{
  // const navigation=useNavigation()
  const [states,setStates]=useState({})
  const [clones,setClones]=useState([])
  const {state,dispatch}=useAuth()
  useFocusEffect(
    useCallback(()=>{
      dispatch({type:"SHOW"})
      AsyncStorage.getItem("clones")
      .then(res=>{
        setClones(JSON.parse(res))
        payAttention()
      })
      .catch(res=>{
        console.log(res)
        setClones([])
      })
    },[])
  )


  function payAttention(){
    // axios.post(
    //   utils.url+"/payattention",

    // )
    // .then(res=>{
    //   console.log(res.data)
    // })
    // .catch(res=>{
    //   console.log(res)
    // })
    console.log(utils.token)
    AsyncStorage.getItem("token")
    .then(token=>{
      axios.get(
        utils.url+"getclonestate",
        {
          headers:{
            'Authorization': `Bearer ${utils.token}`
          }
        }
      )
      .then(res=>{
        var data=res.data
        console.log(data.states)
        var _states=data.states
        var states={}
        _states.forEach((state,index)=>{
          console.log(state)
          var cloneid=state.id
          var answers=state.answers
          if(answers==null){
            answers=[]
          }
          states[cloneid]=answers
        })
        setStates(states)
      })
      .catch(err=>{
        console.log("getclonestate "+err)
      })
    })
  }

  if(clones!=null){
    return(
      <PageBase0 name={"状态页"}>
        {clones.map((clone,index)=>
          <View key={index} style={{width:"100%"}}>
            <ComState clone={clone} messages={states[clone.cloneid]}></ComState>
            <ComSpacer height={20}/>
          </View>
        )}
      </PageBase0>
    )
  }else{
    return <PageBase0 name={"状态页"}>
      <Text style={{fontSize:utils.fontSize2,color:"gray"}}>空无一物</Text>
    </PageBase0>
  }

}
export default PageState