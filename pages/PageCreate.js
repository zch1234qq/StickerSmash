import { Text, Icon, IconButton } from 'react-native-paper';
import * as React from 'react';
import  PageBase01 from '../component/PageBase01';
import { View } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../common/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import ComSearch from '../component/ComSearch';

function PageCreate({navigation}) {
  const store=useAuth()
  if(store.state.empty){
    return
  }
  console.log("pagecreate")
  const {state,dispatch}=useAuth()
  const [disablecreate,setDisablecreate]=useState(false)

  useFocusEffect(
    React.useCallback(()=>{
      dispatch({type:"SHOW"})
    },[])
  )

  function createClone(){
    setDisablecreate(true)
    dispatch({type:"SUCCESS",message:"创建成功"})
    navigation.navigate("mark",{cloneid:""})
    setDisablecreate(false)
  }
  return (
    <PageBase01 name={""}>
      <ComSearch></ComSearch>
      <View>
        <IconButton
          icon="plus-circle-outline"
          size={72}
          onPress={createClone}
          disabled={disablecreate}
          />
        <Text style={{textAlign:'center',fontSize:24}}>
          创建分身
        </Text>
      </View>
    </PageBase01>
  )
};
export default PageCreate;