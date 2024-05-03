import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { View } from 'react-native';
import PageAdmin from '../pages/PageAdmin';
import PageCreate from '../pages/PageCreate';
import PageState from '../pages/PageState';
import PageLogin from '../pages/PageLogin';
import PageDesktop from '../pages/PageDesktop';
import { useAuth } from '../common/AuthContext';
import TabBarIcon from './TabBarIcon';

const Tab=createMaterialBottomTabNavigator()
export const RouteStackBottom=()=>{
  const {state,dispatch}=useAuth()
  return (
    <View style={{width:"100%",height:"100%"}}>
      <Tab.Navigator barStyle={{height:68,display:"none"}}
        screenOptions={{headerShow:false}}
      >
        <Tab.Screen name="创建" component={PageCreate}
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
          <Tab.Screen name="login" component={PageLogin} initialParams={{positive:true}}
            options={{
              tabBarLabel:"登录",
              tabBarIcon:({focused,color})=>{
                return <TabBarIcon name0={"login-variant"} name1={"login"} focused={focused}></TabBarIcon>
              }
            }}
          />
        }
        {state.logined &&
          <Tab.Screen name="桌面" component={PageDesktop}
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
  );
};