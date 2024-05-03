import PageAdmin from '../pages/PageAdmin';
import PageUse from '../pages/PageUse';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export function RouteStackOther() {
  return (
    <Stack.Navigator initialRouteName={"admin"} screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="admin" component={PageAdmin} />
      <Stack.Screen name="use" component={PageUse} />
    </Stack.Navigator>
  );
}