import * as React from 'react';
import {PaperProvider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageMain from './pages/PageMain';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider,useAuth } from './common/AuthContext';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <NavigationContainer>
          <AuthProvider>
            <PageMain></PageMain>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};
export default App;
