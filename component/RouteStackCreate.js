import PageCreate from '../pages/PageCreate';
import PageAdmin from '../pages/PageAdmin';
import PageUse from '../pages/PageUse';
import { createStackNavigator } from '@react-navigation/stack';
import PageLogin from '../pages/PageLogin';
const Stack = createStackNavigator();

function RouteStackCreate() {
  return (
    <Stack.Navigator initialRouteName={"create"} screenOptions={{
      headerShown:false,
    }}>
      <Stack.Screen name="create" component={PageCreate} />
      <Stack.Screen name="admin" component={PageAdmin}/>
      <Stack.Screen name="use" component={PageUse} />
    </Stack.Navigator>
  );
}
export default RouteStackCreate