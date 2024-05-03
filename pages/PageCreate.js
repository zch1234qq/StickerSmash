import { Drawer, Button, Checkbox, Text, Icon, IconButton } from 'react-native-paper';
import * as React from 'react';
import utils from '../common/utils';
import PageBase0 from '../component/PageBase0';
import { View } from 'react-native';
import axios from 'axios';
import { useAuth } from '../common/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

function PageCreate({navigation}) {
  console.log("pagecreate")
  const {state,dispatch}=useAuth()
  useFocusEffect(
    React.useCallback(()=>{
      dispatch({type:"SHOW"})
    },[])
  )

  function createClone(){
    axios.get(
      url=utils.url+"createclone"
    )
    .then(res=>{
      var data=res.data
      var cloneid=data.cloneid
      console.log("create "+cloneid)
      navigation.navigate("admin",{cloneid:cloneid,simple:true})
    })
    .catch(res=>{
      console.log(res)
    })
  }
  return (
    <PageBase0 name={"创建"}
      children={
        <View>
          <IconButton
            icon="plus-circle-outline"
            size={72}
            onPress={createClone}
          />
          <Text style={{textAlign:'center',fontSize:24}}>
            创建分身
          </Text>
        </View>
      }
    />
  )
};
export default PageCreate;