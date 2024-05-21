import PageCreate from '../pages/PageCreate';
import PageState from '../pages/PageState';
import PageLogin from '../pages/PageLogin';
import PageDesktop from '../pages/PageDesktop';
import PageAdmin from '../pages/PageAdmin';
import PageUse from '../pages/PageUse';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="desktop">
      <Stack.Screen name="create" component={PageCreate} />
      <Stack.Screen name="state" component={PageState} />
      <Stack.Screen name="login" component={PageLogin} />
      <Stack.Screen name="desktop" component={PageDesktop} />
      <Stack.Screen name="admin" component={PageAdmin} />
      <Stack.Screen name="use" component={PageUse} />
    </Stack.Navigator>
  );
}

export default AppNavigator