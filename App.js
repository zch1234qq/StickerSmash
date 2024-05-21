import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageMain from './pages/PageMain';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider} from './common/AuthContext';
import utils from './common/utils';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const CombinedTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#FFA726',
    background: '#ffffff',
    card: '#FFA726',
    text: '#ffffff',
    border: '#FFA726',
  }
};
const App = () => {
  return (
    <PaperProvider theme={utils.theme}>
      <SafeAreaView>
          <AuthProvider>
        <NavigationContainer>
            {/* <PageMain></PageMain> */}
        </NavigationContainer>
          </AuthProvider>
      </SafeAreaView>
    </PaperProvider>
  );
};
export default App;
