import { View,Text } from 'react-native'
import {Clone} from '../common/classes'
import { useEffect, useState } from 'react'
import PageBase1 from '../component/PageBase1'
import { IconButton } from 'react-native-paper'
import axios from 'axios'
import utils from '../common/utils'
import { useAuth } from '../common/AuthContext'

const PageUse=({route})=>{
  const cloneid=route.params.cloneid
  console.log(route)
  const [clone,setClone]=useState(new Clone("","","","",""))
  const [icon,setIcon]=useState('microphone-outline')
  const [ans,setAns]=useState("")
  const {state,dispatch}=useAuth()
  useEffect(()=>{
    dispatch({type:"HIDE"})
    clone.visitclone(cloneid,setClone)
  },[])
  function toGpt(){
    const data = {
      messages: ["你是谁,大声告诉我"],
      cloneid:cloneid
    };
    axios.post(
      utils.url+"gpt",
      data,
    )
    .then(res=>{
      var data=res.data
      console.log(data.msg)
      setAns(data.msg)
    })
    .catch(res=>{
      console.log("err "+res)
    })
  }
  return (
    <PageBase1>
      <View style={{width:'100%',height:'100%',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
        <Text style={{fontSize:utils.fontSize1}}>{clone.name}</Text>
        <Text style={{fontSize:36}}>
          {ans}
        </Text>
        <IconButton icon={icon} size={72}
          onPressIn={()=>{setIcon("microphone"); setAns("nihaoa")}}
          onPressOut={()=>{
            setIcon("microphone-outline")
            toGpt()
          }}
          >
        </IconButton>
      </View>
    </PageBase1>
  );
}
export default PageUse;