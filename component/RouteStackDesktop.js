import PageDesktop from '../pages/PageDesktop';
import PageAdmin from '../pages/PageAdmin';
import PageUse from '../pages/PageUse';
import PageSetting from '../pages/PageSetting';
import { createStackNavigator } from '@react-navigation/stack';
import PageShare from '../pages/PageShare';

const Stack = createStackNavigator();
function RouteStackDesktop() {
  return (
    <Stack.Navigator initialRouteName={"_desktop"} screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="_desktop" component={PageDesktop} />
      <Stack.Screen name="admin" component={PageAdmin} />
      <Stack.Screen name="use" component={PageUse} />
      <Stack.Screen name="setting" component={PageSetting} />
      <Stack.Screen name="share" component={PageShare} />
    </Stack.Navigator>
  );
}
export default RouteStackDesktop