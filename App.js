import * as React from 'react';
import {Button, PaperProvider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageMain from './pages/PageMain';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider,useAuth } from './common/AuthContext';
import * as FileSystem from 'expo-file-system';

const App = () => {
  async function saveFile() {
      const fileUri = FileSystem.documentDirectory + "example.txt";
      const content = "Hello, world! This is a test file.";
  
      try {
          await FileSystem.writeAsStringAsync(fileUri, content);
          console.log("File saved successfully to:", fileUri);
      } catch (error) {
          console.error("Failed to save the file:", error);
      }
  }
  
  // 调用保存文件函数
  saveFile();
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
