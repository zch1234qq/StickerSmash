import * as React from 'react';
import { View } from 'react-native';
import PageState from './PageState';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import TabBarIcon from '../component/TabBarIcon';
import RouteStackCreate from '../component/RouteStackCreate';
import RouteStackDesktop from '../component/RouteStackDesktop';
import utils from '../common/utils';
import { useAuth } from '../common/AuthContext';
import { setupInterceptors } from '../common/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotiSuccess } from '../component/NotiSuccess';
import { NotiFail } from '../component/NotiFail';
import { NotiInfo } from '../component/NotiInfo';
import RouteStackLogin from '../component/RouteStackLogin';

const Tab=createMaterialBottomTabNavigator()
const PageMain = () => {
  utils.navigation=useNavigation()
  const {state,dispatch}=useAuth()
  utils.dispatch=dispatch
  const store=useAuth()
  setupInterceptors(store)
  React.useEffect(()=>{
    AsyncStorage.getItem("token")
    .then(token=>{
      console.log("token: "+token)
      utils.token=token
      if(token!=""&& token!=null){
        dispatch({type:'LOGIN'})
      }
      else{
        dispatch({type:"LOGOUT"})
      }
    })
  },[dispatch])

  return (
    // <View style={{width:"100vw",height:"100vh",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    // <View style={{width:"55vh",height:"90vh"}}>
    <View style={{width:"100%",height:"100%"}}>
    <View style={{width:"100%",height:"100%"}}>
      <NotiSuccess></NotiSuccess>
      <NotiFail></NotiFail>
      <NotiInfo></NotiInfo>
      <Tab.Navigator barStyle={{height:70,display:store.state.display}}>
        <Tab.Screen name="创建" component={RouteStackCreate}
          options={{
            tabBarLabel:"创建",
            tabBarIcon:({focused,color})=>{
              return <TabBarIcon name0={"plus-box"} name1={"plus-box-outline"} focused={focused}></TabBarIcon>
            }
          }}
        />
        <Tab.Screen name="state" component={PageState}
          options={{
            tabBarLabel:"状态",
            tabBarIcon:({focused,color})=>{
              return <TabBarIcon name0={"information"} name1={"information-outline"} focused={focused}></TabBarIcon>
            }
          }}
        />
        {!state.logined &&
          // <Tab.Screen name="login" component={PageLogin} initialParams={{positive:true}}
          <Tab.Screen name="login" component={RouteStackLogin} initialParams={{positive:true}}
            options={{
              tabBarLabel:"登录",
              tabBarIcon:({focused,color})=>{
                return <TabBarIcon name0={"login-variant"} name1={"login"} focused={focused}></TabBarIcon>
              }
            }}
          />
        }
        {state.logined &&
          <Tab.Screen name="desktop" component={RouteStackDesktop}
            options={{
              tabBarLabel:"桌面",
              tabBarIcon:({focused,color})=>{
                return <TabBarIcon name0={"toolbox"} name1={"toolbox-outline"} focused={focused}></TabBarIcon>
              }
            }}
          />
        }
      </Tab.Navigator>
    </View>
    </View>
  );
};

export default PageMain;