import { Drawer, Button, Checkbox, Text, Icon, IconButton } from 'react-native-paper';
import * as React from 'react';
import utils from '../common/utils';
import PageBase0 from '../component/PageBase0';
import { View } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../common/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import ComQR from '../component/ComQR';

function PageCreate({navigation}) {
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
    <PageBase0 name={"创建页"}>
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
    </PageBase0>
  )
};
export default PageCreate;