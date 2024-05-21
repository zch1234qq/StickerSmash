import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import utils from '../common/utils';
import { useAuth } from '../common/AuthContext';
import { setupInterceptors } from '../common/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteStackBottom } from '../component/RouteStackBottom';
import { RouteStackOther } from '../component/RouteStackOther';

const RootStack=createNativeStackNavigator()
const PageMain = () => {
  utils.navigation=useNavigation()
  const {state,dispatch}=useAuth()
  const store=useAuth()
  setupInterceptors(store)
  React.useEffect(()=>{
    AsyncStorage.getItem("token")
    .then(token=>{
      console.log("token: "+token)
      utils.token=token
      if(token!=""&& token!=null){
        store.dispatch({type:'LOGIN'})
      }
      else{
        store.dispatch({type:"LOGOUT"})
      }
    })
  },[dispatch])

  return (
    <View style={{width:"100%",height:"100%"}}>
      <RootStack.Navigator>
        <RootStack.Screen name='bottom' component={RouteStackBottom} options={{
          headerShown:false,
        }}/>
        <RootStack.Screen name="other" component={RouteStackOther}/>
      </RootStack.Navigator>
    </View>
  );
};

export default PageMain;