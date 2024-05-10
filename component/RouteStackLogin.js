import PageLogin from '../pages/PageLogin';
import { createStackNavigator } from '@react-navigation/stack';
import PageProtocolService from '../pages/PageProtocolService';
import PageProtocolPrivacy from '../pages/PageProtocolPrivacy';
import PageProtocolAccount from '../pages/PageProtocolAccount';
const Stack = createStackNavigator();

function RouteStackLogin() {
  return (
    <Stack.Navigator initialRouteName={"_login"} screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="_login" component={PageLogin} initialParams={{positive:true}}/>
      <Stack.Screen name="service" component={PageProtocolService}/>
      <Stack.Screen name="privacy" component={PageProtocolPrivacy}/>
      <Stack.Screen name="account" component={PageProtocolAccount}/>
    </Stack.Navigator>
  );
}
export default RouteStackLogin