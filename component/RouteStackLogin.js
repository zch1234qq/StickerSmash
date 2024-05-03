import PageCreate from '../pages/PageCreate';
import PageState from '../pages/PageState';
import PageLogin from '../pages/PageLogin';
import PageDesktop from '../pages/PageDesktop';
import PageAdmin from '../pages/PageAdmin';
import PageUse from '../pages/PageUse';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function RouteStackLogin() {
  return (
    <Stack.Navigator initialRouteName={"login"} screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="login" component={PageDesktop} />
    </Stack.Navigator>
  );
}
export default RouteStackLogin