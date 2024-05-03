import PageCreate from '../pages/PageCreate';
import PageState from '../pages/PageState';
import PageLogin from '../pages/PageLogin';
import PageDesktop from '../pages/PageDesktop';
import PageAdmin from '../pages/PageAdmin';
import PageUse from '../pages/PageUse';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function RouteStackDesktop() {
  return (
    <Stack.Navigator initialRouteName={"desktop"} screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="desktop" component={PageDesktop} />
      <Stack.Screen name="admin" component={PageAdmin} />
      <Stack.Screen name="use" component={PageUse} />
    </Stack.Navigator>
  );
}
export default RouteStackDesktop